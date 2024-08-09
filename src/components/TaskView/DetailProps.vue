<template>
    <div class="modal fade" id="TaskViewModelDetail" data-bs-backdrop="static" tabindex="-1"
        aria-labelledby="modalComponentLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalComponentLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Topic">{{ $t("TaskView.DetailProps.Topic") }}</label>
                                <input type="text" id="Topic" v-bind:value="data.Topic" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Protocol">{{ $t("TaskView.DetailProps.Protocol") }}</label>
                                <input type="text" id="Protocol" v-bind:value="data.Protocol" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Domain">{{ $t("TaskView.DetailProps.Domain") }}</label>
                                <input type="text" id="Domain" v-bind:value="data.Domain" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Path">{{ $t("TaskView.DetailProps.Path") }}</label>
                                <input type="text" id="Path" v-bind:value="data.Path" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Port">{{ $t("TaskView.DetailProps.Port") }}</label>
                                <input type="text" id="Port" v-bind:value="data.Port" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Method">{{ $t("TaskView.DetailProps.Method") }}</label>
                                <input type="text" id="Method" v-bind:value="data.Method" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Execute">{{ $t("TaskView.DetailProps.Execute") }}</label>
                                <input type="text" id="Execute" v-bind:value="formatTimestamp(data.Execute)" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Status">{{ $t("TaskView.DetailProps.Status") }}</label>
                                <input type="text" id="Status" v-bind:value="statusMap[data.Status]" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Result">{{ $t("TaskView.DetailProps.Result") }}</label>
                                <input type="text" id="Result" v-bind:value="resultMap[data.Result]" readonly />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Remark">{{ $t("TaskView.DetailProps.Remark") }}</label>
                                <input type="text" id="Remark" v-bind:value="data.Remark" readonly />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="CreateTime">{{ $t("TaskView.DetailProps.CreateTime") }}</label>
                                <input type="text" id="CreateTime" v-bind:value="formatTimestamp(data.CreateTime)"
                                    readonly />
                            </div>
                            <div class="form-group">
                                <label for="UpdateTime">{{ $t("TaskView.DetailProps.UpdateTime") }}</label>
                                <input type="text" id="UpdateTime" v-bind:value="formatTimestamp(data.UpdateTime)"
                                    readonly />
                            </div>
                        </div>
                        <div class="form-row" v-if="data.Args && data.Args.length > 0">
                            <div class="form-group">
                                <label for="Remark">{{ $t("TaskView.DetailProps.Args") }}</label>
                                <div v-for="(arg, index) in data.Args" :key="index" class="add-item">
                                    <input type="text" :id="arg.Field" :value="arg.Field" readonly />
                                    <input type="text" :id="arg.Value" :value="arg.Value" readonly />
                                </div>
                            </div>
                        </div>
                        <div class="form-row" v-if="data.Args && data.Headers.length > 0">
                            <div class="form-group">
                                <label for="Remark">{{ $t("TaskView.DetailProps.Headers") }}</label>
                                <div v-for="(header, index) in data.Headers" :key="index" class="add-item">
                                    <input type="text" :id="header.Field" :value="header.Field" readonly />
                                    <input type="text" :id="header.Value" :value="header.Value" readonly />
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="data.Response && data.Response != ''">
                            <label for="Response">{{ $t("TaskView.DetailProps.Response") }}</label>
                            <input type="textarea" id="Response" v-bind:value="data.Response" readonly />
                        </div>
                        <div class="form-group" v-if="data.Error && data.Error != ''">
                            <label for="Error">{{ $t("TaskView.DetailProps.Error") }}</label>
                            <input type="text" id="Error" v-bind:value="data.Error" readonly />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t("TaskView.CreateProps.Btn.Close") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatTimestamp } from '@/utils/tools/time'
import { useI18n } from 'vue-i18n';
const { t } = useI18n(); // 語系

defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: {},
        required: true
    },
    statusMap: {
        type: {},
        required: true
    },
});

const resultMap = ref({
    1: t("TaskView.DetailProps.ResultMap.Success"),
    2: t("TaskView.DetailProps.ResultMap.Fail"),
})

</script>

<style scoped>
input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 15px;
}

.form-group {
    flex: 1 1 25%;
    min-width: 200px;
    margin-bottom: 5px;
}

.add-item {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 50%;
    min-width: 300px;
}

.add-item input {
    flex: 1 1 50%;
    margin-right: 10px;
    margin-bottom: 5px;
}
</style>
