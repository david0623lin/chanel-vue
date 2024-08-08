<template>
    <h3>{{ $t("TaskView.Title") }}</h3>
    <hr>
    <div class="search-form-container">
        <h4>{{ $t("TaskView.SearchItem.Title") }}</h4>
        <form @submit.prevent="handleSearch">
            <AlertComponent ref="alertRef" />
            <div class="form-row">
                <div class="form-group">
                    <label for="start-time">{{ $t("TaskView.SearchItem.StartTime") }}</label>
                    <input type="datetime-local" id="start-time" v-model="form.StartTime" />
                </div>

                <div class="form-group">
                    <label for="end-time">{{ $t("TaskView.SearchItem.EndTime") }}</label>
                    <input type="datetime-local" id="end-time" v-model="form.EndTime" />
                </div>

                <div class="form-group">
                    <label for="Topic">{{ $t("TaskView.SearchItem.Topic") }}</label>
                    <input type="text" id="Topic" v-model="form.Topic" />
                </div>

                <div class="form-group">
                    <label for="status">{{ $t("TaskView.SearchItem.Status") }}</label>
                    <select id="status" v-model="form.Status">
                        <option value="">{{ $t("TaskView.SearchItem.Select") }}</option>
                        <option v-for="(label, value) in resultStatusMapValue" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="method">{{ $t("TaskView.SearchItem.Method") }}</label>
                    <select id="method" v-model="form.Method">
                        <option value="">{{ $t("TaskView.SearchItem.Select") }}</option>
                        <option v-for="(label, value) in resultMethodMapValue" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">{{ $t("TaskView.Btn.Submit") }}</button>
                    <button type="button" class="btn btn-secondary" @click="handleClear">
                        {{ $t("TaskView.Btn.Clear") }}
                    </button>
                    <button type="button" class="btn btn-success" @click="handleShowCreate">
                        {{ $t("TaskView.Btn.Create") }}
                    </button>
                </div>
            </div>
        </form>
    </div>

    <div class="results-container">
        <h4>{{ $t("TaskView.SearchResult.Title") }}</h4>
        <table class="results-table">
            <thead>
                <tr>
                    <th>{{ $t("TaskView.SearchResult.Topic") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Protocol") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Domain") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Path") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Port") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Method") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Execute") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Status") }}</th>
                    <th>{{ $t("TaskView.SearchResult.Operate") }}</th>
                </tr>
            </thead>
            <tbody v-if="results.length > 0">
                <tr v-for="(result, index) in results" :key="index">
                    <td>{{ result.Topic }}</td>
                    <td>{{ result.Protocol }}</td>
                    <td>{{ result.Domain }}</td>
                    <td>{{ result.Path }}</td>
                    <td>{{ result.Port }}</td>
                    <td>
                        <span :class="resultMethodMap[result.Method]">{{ result.Method }}</span>
                    </td>
                    <td>{{ formatTimestamp(result.Execute) }}</td>
                    <td>
                        <span :class="resultStatusMap[result.Status]">{{ resultStatusMapValue[result.Status] }}</span>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" @click="handleShowDetail(index)">{{
                            $t("TaskView.Btn.Detail") }}
                        </button>
                        <button type="button" class="btn btn-outline-warning" @click="handleClear">{{
                            $t("TaskView.Btn.Update") }}
                        </button>
                        <button type="button" class="btn btn-outline-danger" @click="handleClear">{{
                            $t("TaskView.Btn.Delete") }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <CreateProps v-if="showCreate" :title="$t('TaskView.CreateProps.Title')" :methodMap="resultMethodMapValue"
            @submit="handleCreate" />
        <DetailProps v-if="showDetail" :title="$t('TaskView.DetailProps.Title')" :data="detailData"
            :statusMap="resultStatusMapValue" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AlertComponent from '@/components/AlertComponent.vue';
import CreateProps from '@/components/TaskView/CreateProps.vue';
import DetailProps from '@/components/TaskView/DetailProps.vue';
import axiosInstance from '@/utils/api'
import { formatTimestamp, convertToTimestamp, getTodayRange } from '@/utils/tools/time'
import { useI18n } from 'vue-i18n';
import * as bootstrap from 'bootstrap';

const { t } = useI18n(); // 語系
const alertRef = ref(null);

onMounted(() => {
    const today = getTodayRange();
    form.value.StartTime = today[0]
    form.value.EndTime = today[1]
});

const form = ref({
    StartTime: '',
    EndTime: '',
    Topic: '',
    Status: '',
    Method: '',
});

const results = ref([]);

const resultStatusMap = ref({
    1: "badge rounded-pill bg-secondary",
    2: "badge rounded-pill bg-success",
    3: "badge rounded-pill bg-danger",
})

const resultStatusMapValue = ref({
    1: t("TaskView.SearchItem.SelectStatus.NoRun"),
    2: t("TaskView.SearchItem.SelectStatus.Run"),
    3: t("TaskView.SearchItem.SelectStatus.RunErr"),
})

const resultMethodMap = ref({
    GET: "badge rounded-pill bg-info",
    POST: "badge rounded-pill bg-success",
    PUT: "badge rounded-pill bg-warning",
    DELETE: "badge rounded-pill bg-danger",
})

const resultMethodMapValue = ref({
    GET: t("TaskView.SearchItem.SelectMethod.Get"),
    POST: t("TaskView.SearchItem.SelectMethod.Post"),
    PUT: t("TaskView.SearchItem.SelectMethod.Put"),
    DELETE: t("TaskView.SearchItem.SelectMethod.Delete"),
})

const handleSearch = () => {
    axiosInstance.get('/task/list', {
        params: {
            StartTime: convertToTimestamp(form.value.StartTime),
            EndTime: convertToTimestamp(form.value.EndTime),
            Topic: form.value.Topic,
            Status: form.value.Status,
            Method: form.value.Method,
        }
    }).then(response => {
        if (response.data.Code === 0) {
            results.value = response.data.Result;
        } else {
            alertRef.value.showAlert(response.data.Message, 'danger');
        }
    }).catch(error => {
        console.error('Request Error:', error);
        alertRef.value.showAlert(t("AxiosCatchError"), 'danger');
    });
}

const handleClear = () => {
    form.value.StartTime = '';
    form.value.EndTime = '';
    form.value.Status = '';
    form.value.Method = '';
    form.value.Path = '';
}

const showCreate = ref(false);

const handleShowCreate = () => {
    showCreate.value = true;
    setTimeout(() => {
        const modalElement = document.getElementById('TaskViewModelCreate');
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    }, 100);
}

const handleCreate = (formData) => {
    axiosInstance.post('/task/create', formData).then(response => {
        if (response.data.Code === 0) {
            alertRef.value.showAlert(response.data.Message, 'success');
        } else {
            alertRef.value.showAlert(response.data.Message, 'danger');
        }
    }).catch(error => {
        console.error('Request Error:', error);
        alertRef.value.showAlert(t("AxiosCatchError"), 'danger');
    });
    showCreate.value = false;
}

const showDetail = ref(false);
const detailData = ref({})

const handleShowDetail = (index) => {
    showDetail.value = true;

    axiosInstance.get('/task/detail', {
        params: {
            ID: results.value[index].ID,
        }
    }).then(response => {
        if (response.data.Code === 0) {
            response.data.Result.Args = Object.entries(response.data.Result.Args).map(([key, value]) => ({
                Field: key,
                Value: value
            }));
            response.data.Result.Headers = Object.entries(response.data.Result.Headers).map(([key, value]) => ({
                Field: key,
                Value: value
            }));
            detailData.value = response.data.Result;
            console.log(detailData.value)
        } else {
            alertRef.value.showAlert(response.data.Message, 'danger');
        }
    }).catch(error => {
        console.error('Request Error:', error);
        alertRef.value.showAlert(t("AxiosCatchError"), 'danger');
    });

    setTimeout(() => {
        const modalElement = document.getElementById('TaskViewModelDetail');
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    }, 100);
}

</script>

<style scoped>
.search-form-container {
    margin: 0 auto;
    padding: 20px;
    background-color: #ededed;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
}

.form-group {
    flex: 1;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

select {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

.form-group .btn {
    margin-top: 28px;
    margin-left: 5px;
}

td .btn {
    margin-left: 5px;
}

/* 新增表格样式 */
.results-container {
    margin-top: 20px;
    background-color: #ededed;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.results-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.results-table th,
.results-table td {
    border: 1px solid #dee2e6;
    padding: 12px 15px;
    text-align: left;
}

.results-table th {
    background-color: #343a40;
    color: #fff;
    font-weight: bold;
}

.results-table tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

.results-table tbody tr:hover {
    background-color: #e9ecef;
    transition: background-color 0.2s;
}

.results-table td {
    color: #495057;
}
</style>
