<template>
    <div class="select-container">
        <select v-model="locale" class="select">
            <option v-for="(value, key) in localeOptions" :key="value" :value="value">
                {{ key }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n';

// 語系
const { locale } = useI18n();

// 語言選項對照表
const localeOptions = {
    "繁體中文": "zh-TW",
    "English": "en-US"
};

// 初始化語系
const storedLocale = localStorage.getItem("locale");

if (storedLocale) {
    locale.value = storedLocale;
}
watch(locale, (newLocale) => {
    localStorage.setItem("locale", newLocale);
});

</script>

<style scoped>
.select-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.select {
    width: 100px;
    padding: 0.25rem 0.5rem;
    /* 减小内边距 */
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    font-size: 0.875rem;
    /* 减小字体大小 */
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

.select option {
    padding: 0.25rem;
    /* 减小选项的内边距 */
}
</style>