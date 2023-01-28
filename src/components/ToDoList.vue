<template>
  <Toast />
  <div class="container-fluid " v-if="listRequired">
    <button type="button" class="btn btn-primary float-right mt-5" style="float:right" @click="logout()">Logout</button>
    <button type="button" class="btn btn-primary float-left mt-5" @click="addList()">Add ToDoList</button>
    <div class="col-span-12 items-center mt-5">
      <div class="table-repesonsive subject">
        <DataTable :value="list" :paginator="true" :rows="10" class="p-datatable-sm" stripedRows
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 50, 100, 200]" responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" filterDisplay="menu"
          :filters="filters">
          <template #header>
            <div class="flex justify-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
              </span>
            </div>
          </template>

          <Column field="title" header="Title" style="text-align:left"></Column>
          <Column field="description" header="Description" style="text-align:left"></Column>

          <Column header="Options" style="text-align:left">
            <template #body="slotProps">
              <button type="button" class="btn btn-light mr-1" data-toggle="modal" data-target="#exampleModal"
                @click="editClick(slotProps.data)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </button>

              <button style="color: red" type="button" @click="deleteClick(slotProps.data.id)"
                class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
              <div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>


  </div>

  <div class="container-fluid mt-5 " v-if="detailList">
    <div class="shadow-lg p-3 mb-5 bg-body rounded todolist_detail">
      <button type="button" class="btn btn-primary float-left">ToDoList Detailes</button>
      <div class="mt-5">
        <label for="" class="title">Title</label> <br>
        <InputText type="text" v-model="title" />
      </div>
      <div class="mt-5">
        <label for="">Description</label> <br>
        <Textarea v-model="description" rows="5" cols="30" />
      </div>
      <button type="button" class="btn btn-primary float-left" v-if="editGetId == null" @click="submit()">
        Submit</button>
      <button type="button" class="btn btn-primary float-left" v-else @click="update()"> Update</button>
    </div>
  </div>


</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from 'vue'
import { useStore } from "vuex";
import InputText from "primevue/inputtext";
import Textarea from 'primevue/textarea';
import { useRouter } from 'vue-router'
import axios from 'axios';
const router = useRouter()
const toast = useToast();
const detailList = ref(false)
const listRequired = ref(true)
const store = useStore();
const title = ref('');
const description = ref('')
const list = ref([])
const editGetId = ref(null)
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});


const editClick = (data) => {
  editGetId.value = data.id
  title.value = data.title,
    description.value = data.description
  detailList.value = true
  listRequired.value = false
}

const submit = async () => {
  await store.dispatch("todolist/getTodoList", {
    title: title.value,
    description: description.value
  })

    .then((response) => {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'item add successfully', life: 3000 });
      listRequired.value = true
      detailList.value = false
      title.value='',
      description.value=''
      console.log(response.status)
    })
  // .catch(error =>{
  //   toast.add({severity:  'success', summary: 'Success Message', detail:error.response.data.errors, life: 3000});
  // })
}

const addList = () => {
  detailList.value = true
  listRequired.value = false
}

const logout = () => {
  store.dispatch('adminAuth/logout')
    .then(response => {
      router.push({ path: '/login' })
      console.log(response.data)
    })

}

const list_item = async () => {
  await store.dispatch("todolist/showTodoList")
    .then(response => {
      list.value = response.data.items.data
    })
}

const deleteClick = async (id) => {
  await store.dispatch("todolist/dltTodoList", id)
    .then(response => {
      alert('do you want to delete')
      toast.add({ severity: 'success', summary: 'Success Message', detail: response.data.message, life: 3000 });
      list_item()
    })
}


const update = async () => {
  let data = {
    title: title.value,
    description: description.value,

  };

  var fd = new FormData();
  for (const [key, value] of Object.entries(data)) {
    fd.append(key, value);
  }
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("user_token");
  await axios
    .put("http://3.232.244.22/api/item/" + editGetId.value, fd)
    .then((response) => {
      toast.add({
        severity: "info",
        summary: "Message",
        detail: 'successfully updated',
        life: 3000,
      });
      list_item()
      listRequired.value = true
      detailList.value = false
      console.log(response.data)
    });
};

onMounted(() => {
  list_item()
})
</script>

<style scoped>
.todolist_detail {
  width: 50%;
  margin: auto;
}

input[type=text],
textarea {
  width: 80%;
}
</style>