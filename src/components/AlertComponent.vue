<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <transition name="fade">
        <div v-if="alert.visible" class="alert" :class="alert.class">
            <i :class="alert.iconClass"></i> {{ alert.message }}
        </div>
    </transition>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const alert = ref({
    visible: false,
    class: 'alert-info',
    iconClass: 'fas fa-info-circle',
    message: ''
});

const iconMap = {
    'danger': 'fas fa-exclamation-triangle',
    'info': 'fas fa-info-circle',
    'success': 'fas fa-check-circle',
    'warning': 'fas fa-exclamation-circle'
};

const showAlert = (message, type = 'info') => {
    alert.value.message = message;
    alert.value.class = `alert alert-${type}`;
    alert.value.iconClass = iconMap[type] || 'fas fa-info-circle';
    alert.value.visible = true;

    setTimeout(() => {
        alert.value.visible = false;
    }, 2000);
};

defineExpose({ showAlert });
</script>

<style scoped>
.alert {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    transition: opacity 0.5s ease-out;
    padding: 1rem 1.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

i {
    margin-right: 0.5rem;
}
</style>