<template>
  <HeaderUser />
    <Template>
      <Grettings />
      <NavMenuDash />
      
    </Template>
  <FooterUser />
</template>

<script>
import HeaderUser from '../../components/components-users/HeaderUser.vue';
import Grettings from '../../components/components-users/Grettings.vue';
import FooterUser from '../../components/components-users/FooterUser.vue';
import NavMenuDash from '../../components/components-users/NavMenuDash.vue';
import Template from '../../components/components-users/Template.vue';

export default {
  name: "Dashboard",
  components: {
    HeaderUser,
    Grettings,
    FooterUser,
    NavMenuDash,
    Template,
  
  },
}
</script>
