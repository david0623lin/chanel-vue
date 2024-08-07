<template>
    <h3>{{ $t("CronView.Title") }}</h3>
    <hr>
    <div class="search-form-container">
        <h4>{{ $t("CronView.SearchItem.Title") }}</h4>
        <form @submit.prevent="handleSearch">
            <AlertComponent ref="alertRef" />
            <div class="form-row">
                <div class="form-group">
                    <label for="start-time">{{ $t("CronView.SearchItem.StartTime") }}</label>
                    <input type="datetime-local" id="start-time" v-model="form.StartTime" />
                </div>

                <div class="form-group">
                    <label for="end-time">{{ $t("CronView.SearchItem.EndTime") }}</label>
                    <input type="datetime-local" id="end-time" v-model="form.EndTime" />
                </div>

                <div class="form-group">
                    <label for="status">{{ $t("CronView.SearchItem.Status") }}</label>
                    <select id="status" v-model="form.Status">
                        <option value="">{{ $t("CronView.SearchItem.Select") }}</option>
                        <option value="1">{{ $t("CronView.SearchItem.SelectStatus.Enable") }}</option>
                        <option value="2">{{ $t("CronView.SearchItem.SelectStatus.Disable") }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="method">{{ $t("CronView.SearchItem.Method") }}</label>
                    <select id="method" v-model="form.Method">
                        <option value="">{{ $t("CronView.SearchItem.Select") }}</option>
                        <option value="GET">{{ $t("CronView.SearchItem.SelectMethod.Get") }}</option>
                        <option value="POST">{{ $t("CronView.SearchItem.SelectMethod.Post") }}</option>
                        <option value="PUT">{{ $t("CronView.SearchItem.SelectMethod.Put") }}</option>
                        <option value="DELETE">{{ $t("CronView.SearchItem.SelectMethod.Delete") }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="path">{{ $t("CronView.SearchItem.Path") }}</label>
                    <input type="text" id="path" v-model="form.Path" />
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">{{ $t("CronView.Btn.Submit") }}</button>
                    <button type="button" class="btn btn-secondary" @click="handleClear">
                        {{ $t("CronView.Btn.Clear") }}
                    </button>
                    <button type="button" class="btn btn-success" @click="showModal">
                        {{ $t("CronView.Btn.Create") }}
                    </button>
                </div>
            </div>
        </form>
    </div>

    <div class="results-container">
        <h4>{{ $t("CronView.SearchResult.Title") }}</h4>
        <table class="results-table">
            <thead>
                <tr>
                    <th>{{ $t("CronView.SearchResult.Protocol") }}</th>
                    <th>{{ $t("CronView.SearchResult.Domain") }}</th>
                    <th>{{ $t("CronView.SearchResult.Path") }}</th>
                    <th>{{ $t("CronView.SearchResult.Port") }}</th>
                    <th>{{ $t("CronView.SearchResult.Method") }}</th>
                    <th>{{ $t("CronView.SearchResult.Args") }}</th>
                    <th>{{ $t("CronView.SearchResult.Headers") }}</th>
                    <th>{{ $t("CronView.SearchResult.Execute") }}</th>
                    <th>{{ $t("CronView.SearchResult.Status") }}</th>
                    <th>{{ $t("CronView.SearchResult.Remark") }}</th>
                    <th>{{ $t("CronView.SearchResult.CreateTime") }}</th>
                    <th>{{ $t("CronView.SearchResult.UpdateTime") }}</th>
                    <th>{{ $t("CronView.SearchResult.Operate") }}</th>
                </tr>
            </thead>
            <tbody v-if="results.length > 0">
                <tr v-for="(result, index) in results" :key="index">
                    <td>{{ result.Protocol }}</td>
                    <td>{{ result.Domain }}</td>
                    <td>{{ result.Path }}</td>
                    <td>{{ result.Port }}</td>
                    <td>
                        <span :class="methodMap[result.Method]">{{ result.Method }}</span>
                    </td>
                    <td>{{ result.Args }}</td>
                    <td>{{ result.Headers }}</td>
                    <td>{{ result.Execute }}</td>
                    <td>{{ result.Status }}</td>
                    <td>{{ result.Remark }}</td>
                    <td>{{ formatTimestamp(result.CreateTime) }}</td>
                    <td>{{ formatTimestamp(result.UpdateTime) }}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" @click="handleClear">{{
                            $t("CronView.Btn.Detail") }}
                        </button>
                        <button type="button" class="btn btn-outline-warning" @click="handleClear">{{
                            $t("CronView.Btn.Update") }}
                        </button>
                        <button type="button" class="btn btn-outline-danger" @click="handleClear">{{
                            $t("CronView.Btn.Delete") }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AlertComponent from '@/components/AlertComponent.vue';
import axiosInstance from '@/utils/api'
import { formatTimestamp, convertToTimestamp, getTodayRange } from '@/utils/tools/time'
import { useI18n } from 'vue-i18n';

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
    Status: '',
    Method: '',
    Path: '',
});

const results = ref([]);

const methodMap = ref({
    GET: "badge rounded-pill bg-info",
    POST: "badge rounded-pill bg-success",
    PUT: "badge rounded-pill bg-warning",
    DELETE: "badge rounded-pill bg-danger",
})

function handleSearch() {
    axiosInstance.get('/cron/list', {
        params: {
            StartTime: convertToTimestamp(form.value.StartTime),
            EndTime: convertToTimestamp(form.value.EndTime),
            Status: form.value.Status,
            Method: form.value.Method,
            Path: form.value.Path,
        }
    }).then(response => {
        if (response.data.Code === 0) {
            // 轉導
            results.value = response.data.Result;
        } else {
            alertRef.value.showAlert(response.data.Message, 'danger');
        }
    }).catch(error => {
        console.error('Request Error:', error);
        alertRef.value.showAlert(t("AxiosCatchError"), 'danger');
    });
}

function handleClear() {
    form.value.StartTime = '';
    form.value.EndTime = '';
    form.value.Status = '';
    form.value.Method = '';
    form.value.Path = '';
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
