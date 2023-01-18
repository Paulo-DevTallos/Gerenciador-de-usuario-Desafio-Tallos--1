<template>
  <HeaderUser />
    <Template>
      <Typography :title="title" />
      <div class="container-contacts">
        <div 
          class="container-form" 
          v-if="accessLevel && this.$store.state.user.rules === 'admin'"
        >
          <FormUserData />
        </div>
        <div class="user-list">
          <header class="user-avaliable">
            <h4>Resultados de usuários</h4>
          </header>
          <SearchBar />
          <CardUsers />
        </div>
      </div>
    </Template>
  <FooterUser />
</template>

<script>
import HeaderUser from '../../components/components-users/HeaderUser.vue';
import FooterUser from '../../components/components-users/FooterUser.vue';
import Typography from '../../components/components-users/Typography.vue';
import CardUsers from '../../components/components-users/CardUsers.vue';
import Template from '../../components/components-users/Template.vue';
import FormUserData from '../../components/components-users/FormUserData.vue';
import SearchBar from '../../components/components-users/SearchBar.vue';

export default {
  name: "Contacts",
  components: {
    HeaderUser,
    FooterUser,
    Typography,
    CardUsers,
    Template,
    FormUserData,
    SearchBar,
},
  emits: ['finduser'],
  data() {
    return {
      title: 'Cadastro de usuários',
      accessLevel: true,
    }
  },
}
</script>
<style scoped>
  @import '../../assets/contacts.css';
</style>