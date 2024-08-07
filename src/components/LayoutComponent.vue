<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="/src/assets/logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
                    Bootstrap
                </a>
                <div class="d-flex" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <div class="main-layout">
        <nav class="sidebar bg-dark text-light">
            <ul class="nav flex-column">
                <li v-for="route in routes" :key="route.path" class="nav-item">
                    <router-link :to="route.path" class="nav-link text-light" v-if="!route.children">
                        <div class="icon-wrapper">
                            <img :src="route.meta.icon" alt="" width="30" height="24">
                        </div>
                        {{ $t("Router." + route.name) }}
                    </router-link>
                    <div v-if="route.children">
                        <button class="nav-link text-light" @click="toggleSubMenu(route.path)">
                            <div class="icon-wrapper">
                                <img :src="route.meta.icon" alt="" width="30" height="24">
                            </div>
                            {{ $t("Router." + route.name) }}
                            <span class="toggle-icon">{{ openMenus.includes(route.path) ? '−' : '+' }}</span>
                        </button>
                        <ul v-show="openMenus.includes(route.path)" class="nav flex-column ms-3">
                            <li v-for="child in route.children" :key="child.path" class="nav-item">
                                <router-link :to="child.path" class="nav-link text-light">
                                    <div class="icon-wrapper">
                                        <img :src="child.meta.icon" alt="" width="30" height="24">
                                    </div>
                                    {{ $t("Router." + child.name) }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>

        <main class="content">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const routes = computed(() => {
    return router.options.routes.filter(route => route.name && route.path !== '/');
});

const openMenus = ref([]);

function toggleSubMenu(path) {
    const index = openMenus.value.indexOf(path);

    if (index === -1) {
        openMenus.value.push(path);
    } else {
        openMenus.value.splice(index, 1);
    }
}

</script>

<style scoped>
/* 全局樣式，確保 navbar 在頁面頂部 */
header {
    width: 100%;
    position: relative;
    z-index: 1050;
    /* 確保 navbar 在 sidebar 之上 */
}

.main-layout {
    display: flex;
    height: calc(100vh - 56px);
    /* navbar 高度，根據需要調整 */
}

.navbar-brand {
    margin-left: 3rem;
    /* 調整這個值來增加距離 */
}

.sidebar {
    width: 250px;
    height: 100%;
    padding: 1rem;
    z-index: 1000;
    overflow-y: auto;
}

.nav-link {
    display: flex;
    align-items: center;
    /* 使內容垂直居中 */
    padding: 0.5rem;
    /* 調整 padding 來增加點擊區域 */
}

.nav-link i {
    margin-right: 0.5rem;
    /* 圖標與文本之間的距離 */
}

.nav-link:hover {
    background-color: #6c757d;
    /* 灰色背景 */
}

.content {
    flex: 1;
    /* 使內容區域填滿剩餘空間 */
    padding: 1rem;
    overflow-y: auto;
    background-color: #f8f9fa;
}

.icon-wrapper {
    margin-right: 10px;
}
</style>
