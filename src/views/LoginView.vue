<template>
    <div class="page-container">
        <div class="form-container">
            <h2>{{ $t("LoginView.Title") }}</h2>
            <div class="lang-container">
                <label class="form-label">{{ $t("LoginView.Lang") }}</label>
                <Lang class="lang-select" />
            </div>
            <form @submit.prevent="handleLogin" novalidate>
                <div class="mb-3">
                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.Account }" id="Account"
                        v-model="form.Account" :placeholder="$t('LoginView.Account')" />
                    <div v-if="errors.Account" class="invalid-feedback">{{ errors.Account }}</div>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" :class="{ 'is-invalid': errors.Password }" id="Password"
                        v-model="form.Password" :placeholder="$t('LoginView.Password')" />
                    <div v-if="errors.Password" class="invalid-feedback">{{ errors.Password }}</div>
                </div>
                <div class="form-btn">
                    <button type="submit" class="btn btn-primary">{{ $t("LoginView.Login") }}</button>
                    <button type="button" class="btn btn-secondary ms-2" @click="handleClear">{{ $t("LoginView.Clear")
                        }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Lang from "@/components/LangComponent.vue";
import { useI18n } from 'vue-i18n';
import axiosInstance from '@/utils/api';

const { t } = useI18n(); // 語系

const form = ref({
    Account: '',
    Password: '',
});

const errors = ref({
    Account: '',
    Password: '',
});

const validateForm = () => {
    errors.value.Account = form.value.Account ? '' : t("LoginView.ErrorAccount");
    errors.value.Password = form.value.Password ? '' : t("LoginView.ErrorPassword");
    return !errors.value.Account && !errors.value.Password;
};

const handleLogin = () => {
    if (!validateForm()) {
        return
    }

    axiosInstance.post('/admin/login', form.value)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Request Error:', error);
        });
};

const handleClear = () => {
    form.value.Account = '';
    form.value.Password = '';
    errors.value.Account = '';
    errors.value.Password = '';
};
</script>

<style scoped>
.page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    /* 页面背景灰色 */
}

.form-container {
    background-color: white;
    /* 表单背景白色 */
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h2 {
    margin-bottom: 1.5rem;
    text-align: center;
    /* 仅标题居中对齐 */
}

.lang-container {
    display: flex;
    justify-content: flex-end;
    /* 靠右对齐 */
    align-items: center;
    /* 垂直居中对齐 */
    margin-bottom: 1.5rem;
    /* 添加与其他内容的间距 */
}

.lang-container .form-label {
    margin-right: 1rem;
}

.form-btn {
    display: flex;
    justify-content: center;
}

.invalid-feedback {
    display: block;
}
</style>