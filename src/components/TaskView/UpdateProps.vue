<template>
    <div class="modal fade" id="TaskViewModelUpdate" data-bs-backdrop="static" tabindex="-1"
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
                                <label for="Topic">{{ $t("TaskView.UpdateProps.Topic") }}</label>
                                <input type="text" id="Topic" v-model="form.Topic"
                                    :class="{ 'is-invalid': required.Topic }"
                                    :placeholder="$t('TaskView.UpdateProps.Topic')" />
                                <div v-if="required.Topic" class="invalid-feedback">{{ required.Topic }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Protocol">{{ $t("TaskView.UpdateProps.Protocol") }}</label>
                                <input type="text" id="Protocol" v-model="form.Protocol"
                                    :class="{ 'is-invalid': required.Protocol }"
                                    :placeholder="$t('TaskView.UpdateProps.Protocol')" />
                                <div v-if="required.Protocol" class="invalid-feedback">{{ required.Protocol }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Domain">{{ $t("TaskView.UpdateProps.Domain") }}</label>
                                <input type="text" id="Domain" v-model="form.Domain"
                                    :class="{ 'is-invalid': required.Domain }"
                                    :placeholder="$t('TaskView.UpdateProps.Domain')" />
                                <div v-if="required.Domain" class="invalid-feedback">{{ required.Domain }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Path">{{ $t("TaskView.UpdateProps.Path") }}</label>
                                <input type="text" id="Path" v-model="form.Path"
                                    :class="{ 'is-invalid': required.Path }"
                                    :placeholder="$t('TaskView.UpdateProps.Path')" />
                                <div v-if="required.Path" class="invalid-feedback">{{ required.Path }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Port">{{ $t("TaskView.UpdateProps.Port") }}</label>
                                <input type="text" id="Port" v-bind:value="data.Port" />
                            </div>
                            <div class="form-group">
                                <label for="Method">{{ $t("TaskView.UpdateProps.Method") }}</label>
                                <select id="method" v-model="form.Method" :class="{ 'is-invalid': required.Method }">
                                    <option value="">{{ $t("TaskView.UpdateProps.Select") }}</option>
                                    <option v-for="(label, value) in methodMap" :key="value" :value="value">
                                        {{ label }}
                                    </option>
                                </select>
                                <div v-if="required.Method" class="invalid-feedback">{{ required.Method }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Execute">{{ $t("TaskView.UpdateProps.Execute") }}</label>
                                <input type="text" id="Execute" v-model="form.Execute"
                                    :class="{ 'is-invalid': required.Execute }"
                                    :placeholder="$t('TaskView.UpdateProps.Execute')" />
                                <div v-if="required.Execute" class="invalid-feedback">{{ required.Execute }}
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Remark">{{ $t("TaskView.UpdateProps.Remark") }}</label>
                                <input type="text" id="Remark" v-bind:value="data.Remark" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Args">{{ $t("TaskView.UpdateProps.Args.Lable") }}</label>
                                <button type="button" class="btn btn-secondary btn-sm" @click="handleAdd(1)">
                                    <span>+</span>
                                </button>
                                <div class="add-container">
                                    <div v-for="(arg, index) in addArgs" :key="index" class="add-item">
                                        <input type="text" v-model="arg.Field"
                                            :placeholder="$t('TaskView.UpdateProps.Args.Field')" />
                                        <input type="text" v-model="arg.Value"
                                            :placeholder="$t('TaskView.UpdateProps.Args.Value')" />
                                        <button type="button" class="btn btn-danger btn-sm"
                                            @click="handleRemove(1, index)">
                                            <span>-</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Args">{{ $t("TaskView.UpdateProps.Headers.Lable") }}</label>
                                <button type="button" class="btn btn-secondary btn-sm" @click="handleAdd(2)">
                                    <span>+</span>
                                </button>
                                <div class="add-container">
                                    <div v-for="(header, index) in addHeaders" :key="index" class="add-item">
                                        <input type="text" v-model="header.Field"
                                            :placeholder="$t('TaskView.UpdateProps.Headers.Field')" />
                                        <input type="text" v-model="header.Value"
                                            :placeholder="$t('TaskView.UpdateProps.Headers.Value')" />
                                        <button type="button" class="btn btn-danger btn-sm"
                                            @click="handleRemove(2, index)">
                                            <span>-</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="data.Response && data.Response != ''">
                            <label for="Response">{{ $t("TaskView.UpdateProps.Response") }}</label>
                            <input type="textarea" id="Response" v-bind:value="data.Response" />
                        </div>
                        <div class="form-group" v-if="data.Error && data.Error != ''">
                            <label for="Error">{{ $t("TaskView.UpdateProps.Error") }}</label>
                            <input type="text" id="Error" v-bind:value="data.Error" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="handleSubmit">
                        {{ $t("TaskView.UpdateProps.Btn.Submit") }}
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">
                        {{ $t("TaskView.UpdateProps.Btn.Close") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    methodMap: {
        type: Object,
        required: true
    }
});

const form = ref({
    TaskID: "",
    Topic: "",
    Protocol: "",
    Domain: "",
    Path: "",
    Port: "",
    Method: "",
    Args: {},
    Headers: {},
    Execute: "",
    Remark: ""
});

const required = ref({
    Topic: "",
    Protocol: "",
    Domain: "",
    Path: "",
    Method: "",
    Execute: "",
});

const addArgs = ref([]);
const addHeaders = ref([]);

// 初始化表單
const initializeForm = () => {
    form.value = { ...props.data };
    addArgs.value = props.data.Args;
    addHeaders.value = props.data.Headers;
};

onMounted(() => {
    // 初始化表单数据
    initializeForm();

    // 監聽 modal 打開事件，重新初始化表單
    const modalElement = document.getElementById('TaskViewModelUpdate');
    modalElement.addEventListener('show.bs.modal', initializeForm);
});

const handleAdd = (type) => {
    switch (type) {
        case 1:
            addArgs.value.push({ Field: "", Value: "" });
            break;
        case 2:
            addHeaders.value.push({ Field: "", Value: "" });
            break;
    }
};

const handleRemove = (type, index) => {
    switch (type) {
        case 1:
            addArgs.value.splice(index, 1);
            break;
        case 2:
            addHeaders.value.splice(index, 1);
            break;
    }
};

const validateForm = () => {
    required.value.Topic = form.value.Topic ? '' : t("TaskView.UpdateProps.Required");
    required.value.Protocol = form.value.Protocol ? '' : t("TaskView.UpdateProps.Required");
    required.value.Domain = form.value.Domain ? '' : t("TaskView.UpdateProps.Required");
    required.value.Path = form.value.Path ? '' : t("TaskView.UpdateProps.Required");
    required.value.Method = form.value.Method ? '' : t("TaskView.UpdateProps.Required");
    required.value.Execute = form.value.Execute ? '' : t("TaskView.UpdateProps.Required");
    return !required.value.Topic && !required.value.Protocol && !required.value.Domain && !required.value.Path && !required.value.Method && !required.value.Execute;
};

const emit = defineEmits(['submit']);

const handleSubmit = () => {
    if (!validateForm()) {
        return;
    }
    // 處理 字串轉數字
    form.value.Execute = parseInt(form.value.Execute, 10)

    // 處理 Args
    form.value.Args = addArgs.value.reduce((obj, item) => {
        obj[item.Field] = item.Value;
        return obj;
    }, {});

    // 處理 Headers
    form.value.Headers = addHeaders.value.reduce((obj, item) => {
        obj[item.Field] = item.Value;
        return obj;
    }, {});

    emit('submit', form.value);
};

const handleClose = () => {
    form.value = {
        TaskID: "",
        Topic: "",
        Protocol: "",
        Domain: "",
        Path: "",
        Port: "",
        Method: "",
        Args: {},
        Headers: {},
        Execute: "",
        Remark: ""
    };
    required.value = {
        Topic: "",
        Protocol: "",
        Domain: "",
        Path: "",
        Method: "",
        Execute: "",
    };
    addArgs.value = [];
    addHeaders.value = [];
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
