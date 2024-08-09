<template>
    <div class="modal fade" id="TaskViewModelDelete" data-bs-backdrop="static" tabindex="-1"
        aria-labelledby="modalComponentLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalComponentLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="handleClose" />
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Topic">{{ $t("TaskView.DeleteProps.Topic") }}</label>
                                <input type="text" id="Topic" v-bind:value="data.Topic" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Protocol">{{ $t("TaskView.DeleteProps.Protocol") }}</label>
                                <input type="text" id="Protocol" v-bind:value="data.Protocol" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Domain">{{ $t("TaskView.DeleteProps.Domain") }}</label>
                                <input type="text" id="Domain" v-bind:value="data.Domain" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Path">{{ $t("TaskView.DeleteProps.Path") }}</label>
                                <input type="text" id="Path" v-bind:value="data.Path" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Port">{{ $t("TaskView.DeleteProps.Port") }}</label>
                                <input type="text" id="Port" v-bind:value="data.Port" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Method">{{ $t("TaskView.DeleteProps.Method") }}</label>
                                <input type="text" id="Method" v-bind:value="data.Method" readonly />
                            </div>
                            <div class="form-group">
                                <label for="Execute">{{ $t("TaskView.DeleteProps.Execute") }}</label>
                                <input type="text" id="Execute" v-bind:value="formatTimestamp(data.Execute)" readonly />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Remark">{{ $t("TaskView.DeleteProps.Remark") }}</label>
                                <input type="text" id="Remark" v-bind:value="data.Remark" readonly />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="handleSubmit">
                        {{ $t("TaskView.DeleteProps.Btn.Submit") }}
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">
                        {{ $t("TaskView.DeleteProps.Btn.Close") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatTimestamp } from '@/utils/tools/time'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
});

onMounted(() => {
    form.value.TaskID = props.data.TaskID
});

const form = ref({
    TaskID: "",
});

const emit = defineEmits(['submit']);

const handleSubmit = () => {
    emit('submit', form.value);
};

const handleClose = () => {
    form.value = {
        TaskID: 0,
    };
};

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
