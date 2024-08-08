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
import { defineProps } from 'vue';
import { formatTimestamp } from '@/utils/tools/time'


defineProps({
    title: {
        type: String,
        required: true
    },
    methodMap: {
        type: {},
        required: true
    },
    data: {
        type: {},
        required: true
    }
});

</script>

<style scoped>
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

.add-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.add-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex: 1 1 30%;
    min-width: 300px;
}

.add-item input {
    flex: 1 1 25%;
    margin-right: 10px;
    margin-bottom: 5px;
}

.form-group button {
    margin-bottom: 5px;
    margin-left: 5px;
}
</style>
