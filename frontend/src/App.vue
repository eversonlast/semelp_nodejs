<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="SISTEMA " subTitle="SEMELP" :hideToggle="!user" :hideUserDropdown="!user" />
		<Menu v-if="user"/>
		<Content />
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl, userKey }  from '@/config/global'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Menu from './components/template/Menu'

export default {
	name: "App",
	components: { Header, Content, Menu, Footer },
	computed: mapState(['isMenuVisible', 'user']),
	data: function(){
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken(){
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData){
				this.validatingToken = false
				this.$router.push({ name: "auth"})
				return
			}
			
			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if(res.data){
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm'){
					this.$store.commit('toggleMenu')
				}
			}else{
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth'})
			}

			this.validatingToken = false

		}
	},
	watch:{
		$route(to){
			if(!userKey && to.path === '/'){
				this.$router.push({
					path: '/auth'
				})
			}

			if(userKey && to.path === 'auth'){
				this.$router.push({
					path: '/'
				})
			}
		}
	},
	created(){
		this.validateToken()
	}

}
</script>

<style>
	*{
		font-family: 'Oswald', 'sans-serif'
	}

	body{ 
		margin: 0;
	}

	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"footer footer"
		;
	}

	#app.hide-menu{
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer"
		;
	}
</style>