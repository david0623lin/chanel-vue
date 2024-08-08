<template>
    <div class="modal fade" id="TaskViewModelCreate" data-bs-backdrop="static" tabindex="-1"
        aria-labelledby="modalComponentLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalComponentLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="handleClose">
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" id="Topic" v-model="form.Topic"
                                    :class="{ 'is-invalid': required.Topic }"
                                    :placeholder="$t('TaskView.CreateProps.Topic')" />
                                <div v-if="required.Topic" class="invalid-feedback">{{ required.Topic }}
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" id="Protocol" v-model="form.Protocol"
                                    :class="{ 'is-invalid': required.Protocol }"
                                    :placeholder="$t('TaskView.CreateProps.Protocol')" />
                                <div v-if="required.Protocol" class="invalid-feedback">{{ required.Protocol }}
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" id="Domain" v-model="form.Domain"
                                    :class="{ 'is-invalid': required.Domain }"
                                    :placeholder="$t('TaskView.CreateProps.Domain')" />
                                <div v-if="required.Domain" class="invalid-feedback">{{ required.Domain }}
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" id="Path" v-model="form.Path"
                                    :class="{ 'is-invalid': required.Path }"
                                    :placeholder="$t('TaskView.CreateProps.Path')" />
                                <div v-if="required.Path" class="invalid-feedback">{{ required.Path }}</div>
                            </div>
                            <div class="form-group">
                                <input type="text" id="Port" v-model="form.Port"
                                    :placeholder="$t('TaskView.CreateProps.Port')" />
                            </div>
                            <div class="form-group">
                                <select id="method" v-model="form.Method" :class="{ 'is-invalid': required.Method }">
                                    <option value="">{{ $t("TaskView.CreateProps.Method") }}</option>
                                    <option v-for="(label, value) in methodMap" :key="value" :value="value">
                                        {{ label }}
                                    </option>
                                </select>
                                <div v-if="required.Method" class="invalid-feedback">{{ required.Method }}
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" id="Execute" v-model="form.Execute"
                                    :class="{ 'is-invalid': required.Execute }"
                                    :placeholder="$t('TaskView.CreateProps.Execute')" />
                                <div v-if="required.Execute" class="invalid-feedback">{{ required.Execute }}
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" id="Remark" v-model="form.Remark"
                                    :placeholder="$t('TaskView.CreateProps.Remark')" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="Args">{{ $t("TaskView.CreateProps.Args.Lable") }}</label>
                                <button type="button" class="btn btn-secondary btn-sm" @click="handleAdd(1)">
                                    <span>+</span>
                                </button>
                                <div class="add-container">
                                    <div v-for="(arg, index) in addArgs" :key="index" class="add-item">
                                        <input type="text" v-model="arg.Field"
                                            :placeholder="$t('TaskView.CreateProps.Args.Field')" />
                                        <input type="text" v-model="arg.Value"
                                            :placeholder="$t('TaskView.CreateProps.Args.Value')" />
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
                                <label for="Args">{{ $t("TaskView.CreateProps.Headers.Lable") }}</label>
                                <button type="button" class="btn btn-secondary btn-sm" @click="handleAdd(2)">
                                    <span>+</span>
                                </button>
                                <div class="add-container">
                                    <div v-for="(header, index) in addHeaders" :key="index" class="add-item">
                                        <input type="text" v-model="header.Field"
                                            :placeholder="$t('TaskView.CreateProps.Headers.Field')" />
                                        <input type="text" v-model="header.Value"
                                            :placeholder="$t('TaskView.CreateProps.Headers.Value')" />
                                        <button type="button" class="btn btn-danger btn-sm"
                                            @click="handleRemove(2, index)">
                                            <span>-</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="handleSubmit">
                        {{ $t("TaskView.CreateProps.Btn.Submit") }}
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">{{
                        $t("TaskView.CreateProps.Btn.Close") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // 語系

defineProps({
    title: {
        type: String,
        required: true
    },
    methodMap: {
        type: {},
        required: true
    }
});

const form = ref({
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
})

const addArgs = ref([])
const addHeaders = ref([])

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
    required.value.Topic = form.value.Topic ? '' : t("TaskView.CreateProps.Required");
    required.value.Protocol = form.value.Protocol ? '' : t("TaskView.CreateProps.Required");
    required.value.Domain = form.value.Domain ? '' : t("TaskView.CreateProps.Required");
    required.value.Path = form.value.Path ? '' : t("TaskView.CreateProps.Required");
    required.value.Method = form.value.Method ? '' : t("TaskView.CreateProps.Required");
    required.value.Execute = form.value.Execute ? '' : t("TaskView.CreateProps.Required");
    return !required.value.Protocol && !required.value.Domain && !required.value.Path && !required.value.Method && !required.value.Execute;
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
}

const handleClose = () => {
    form.value = {
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
    }
    required.value = {
        Topic: "",
        Protocol: "",
        Domain: "",
        Path: "",
        Method: "",
        Execute: "",
    }
    addArgs.value = []
    addHeaders.value = []
}

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
    flex: 1 1 33%;
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
    flex: 1 1 50%;
    min-width: 300px;
}

.add-item input {
    flex: 1 1 50%;
    margin-right: 10px;
    margin-bottom: 5px;
}

.form-group button {
    margin-bottom: 5px;
    margin-left: 5px;
}

.add-item button {
    margin-bottom: 5px;
    margin-right: 15px;
}
</style>
