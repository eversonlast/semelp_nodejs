<template>
  <div>
<PageTitle main="Carregar o Atestado para Afastamento." sub="Carregue uma imagem do atestado" icon="icofont-medicine"/>
	<b-form>
		<div class="login-card card">
			<div class="card-header">
				Upload do Atestado de Afastamento
			</div>
		<div class="card-body form">
			<div class="form-row">
				<div class="form-group col-md-6">					
					<label for="diaAfastamento">Dia do Início do Afastamento</label>
					<b-form-datepicker id="dataAfastamento" 
					locale="pt-BR" startDate="01-01-2020" v-model="examMedicalAfast.dayAtest"
					placeholder="Por favor, escolha uma data para o exame." v-b-popover.hover.top="'Escolha uma data'"></b-form-datepicker>
				</div>
				<div class="form-group col-md-6">
					<label for="quantidadeDeDias">Digite quantidades de Dias</label>
					<input type="text" class="form-control" placeholder="Por favor, Digite a quantidade de dias, somente números.."
					v-model="examMedicalAfast.quantidadesDeDias" id="qdeDias"
					v-b-popover.hover.top="'Por favor, digite a quantidade de dias, neste exemplo o atestado é dia 01/01/01 é de 7 dias, então conta o dia 01 e vai até o dia 07/01/01'"/>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-12">
					<b-form-file type="file" placeholder="Escolha um arquivo"  @change="onChange" name="file" id="file" ref="files" />
					<div id="preview">
						<img v-if="item.imageUrl" :src="item.imageUrl" width="250" height="200"/>
					</div>
				</div>
			</div>
		</div>
		
		<div class="card-body button">
			<b-button variant="success" class="mr-2" v-b-popover.hover.top="'Clique para enviar.'"
			v-on:click="save"
			>Enviar Atestado</b-button>
			<b-button variant="outline-danger" class="mx-2" v-b-popover.hover.top="'Clique para cancelar'">Cancelar</b-button>
		</div>
		</div>
		<div>
			<b-modal id="modalRegisterExamMedicalAfast" title="Verificação de dados." @ok="save">
				Data do Início do Afastamento = {{(examMedicalAfast.dayAtest) }} <br>
				O atestado vence o dia = {{examMedicalAfast.dayVencimento}}
			</b-modal>
		</div>
		

	</b-form>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { baseApiUrl, userKey, showError} from '@/config/global'
import axios from 'axios'

export default {
	name: "UploadExamAfast",
	components: {PageTitle},
	data: function(){
		return{
			examMedicalAfast: {},
			item:{
				image: null,
				imageUrl: null
			},
			inputFile: '',
			userPhoto: {},
			id: 0
		}
	},
	methods:{
		async onChange(e){
			const file = e.target.files[0]
			this.item.image = file
			this.item.imageUrl = URL.createObjectURL(file)
			this.inputFile =  e.target
		},
		async save(){
			this.loadUser()
			this.examMedicalAfast.idUser = this.id
			const url = `${baseApiUrl}/atestadoMedicoAfast/`
			await this.sendPhoto()
			await axios.post(url, this.examMedicalAfast)
				.then(()=> {
					this.$toasted.success('Atestado cadastrado com scucesso')
					//this.examMedicalAfast = {}
					this.item.image = null
					this.item.imageUrl = null
				})
				.catch(showError)
		},
		async sendPhoto(){
			this.loadUser()
			const form = new FormData()
			var dataAtual = new Date ()
			var dia = dataAtual.getDate()
			var mes = dataAtual.getMonth()
			var ano = dataAtual.getFullYear()
			const idByFile = `${this.id}`
			const nome = `${idByFile}-${dia}-${mes}-${ano}.jpg`
			form.append(this.inputFile.name, this.inputFile.files[0], `${nome}`)
			const url = `${baseApiUrl}/uploadAtestadoAfast`
			await axios.post(url, form,{
			headers:{
				"Content-Type" : `multipart/form-data; boundary=${form._boundary}`
				}
			})
			.then(()=>{
				this.$toasted.success("Arquivo enviado com sucesso.")
				this.examMedicalAfast.pathMedicalExamAfast = `/img/${ano}/atestadoAfastamento/${nome}`
			})
			.catch(showError)
		},

		validadeExame(){		
			this.examMedicalAfast.dayAtest= (this.examMedicalAfast.dayAtest).split("-").reverse().toString()
			this.examMedicalAfast.dayAtest = this.examMedicalAfast.dayAtest.replace("-", "/")
		},
		async loadUser(){
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.id = userData.id
			await this.$store.commit('setUser', userData)
		}
	}

}
</script>

<style>

</style>