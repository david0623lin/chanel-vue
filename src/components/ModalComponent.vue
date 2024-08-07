<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <h5>{{ title }}</h5>
                <button class="close-button" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button @click="submitForm">{{ submitText }}</button>
                <button @click="closeModal">{{ cancelText }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        default: 'Modal Title'
    },
    submitText: {
        type: String,
        default: 'Submit'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    isVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close', 'submit']);

function closeModal() {
    emit('close');
}

function submitForm() {
    emit('submit');
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 90%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    margin: 15px 0;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>
