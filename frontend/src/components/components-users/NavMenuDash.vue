<template>
	<nav class="container-dash">
		<ul class="menu">
			<li>
				<RouterLink to="/chat">
					<font-awesome-icon :icon="['fas', 'headset']" />
					<span>Acessar Chat</span> 
				</RouterLink>
			</li>
			<li>
				<RouterLink to="/contacts">
					<font-awesome-icon :icon="['fas', 'list-check']" />
					<span>Acessar Contatos</span>
				</RouterLink>
			</li>
			<li @click="callSupport">
				<div>
					<font-awesome-icon icon="fa-solid fa-circle-info" />
					<span>Falar com Suporte</span>
				</div>
			</li>
		</ul>
    <SupportView v-if="isVisible" />
	</nav>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://localhost:3005')
import SupportView from '../../components/alert-popups/SupportView.vue';

export default {
  name: "NavMenuDash",
  components: { SupportView },
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    callSupport() {
      this.isVisible = !this.isVisible
    },
  },
}
</script>

<style scoped>
	@import '../../assets/components/menu-dashboard.css';
</style>