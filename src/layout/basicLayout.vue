<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-responsive" style="min-height: 100vh">
      <a-layout-sider
        :theme="navTheme"
        v-if="navLayout === 'left'"
        v-model="collapsed"
        :trigger="null"
        collapsible
        width="256px"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <sider-menu :theme="navTheme"></sider-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <setting-drawer></setting-drawer>
  </div>
</template>

<script>
import Header from "./myHeader.vue";
import Footer from "./myFooter.vue";
import siderMenu from "./siderMenu.vue";
import settingDrawer from "@/components/settingDrawer/myIndex.vue";
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  components: {
    Header,
    Footer,
    siderMenu,
    settingDrawer,
  },
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
