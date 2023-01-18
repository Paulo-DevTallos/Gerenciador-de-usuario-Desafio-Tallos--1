<template>
	<div class="grettings-container">
		<img src="/img/user.svg" class="icon" alt="icon de usuario">
		<span>Olá {{ $store.state.user.name }} {{ day_time }}</span>
	</div>
</template>

<script>
export default {
	name: 'Grettings',
	data() {
		return {
			day_time: '',
		}
	},

	mounted() {
		setInterval(() => {
			const date = new Date()

			if(date.getHours() >= 0 && date.getHours() < 12) {
				this.day_time = 'bom dia, é bom te ver por aqui! ;)'
			}
			else if(date.getHours() >= 12 && date.getHours() < 18) {
				this.day_time = 'boa tarde, é bom te ver por aqui! ;)'
			}
			else{
				this.day_time = 'boa noite, é bom te ver por aqui! ;)'
			}
		}, 1000)
	}
}
</script>
<style scoped>
	@import '../../assets/components/grettings.css';
</style>