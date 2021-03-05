
Vue.component("prestation-comp", {
	props:{
		title: String,
		timework:{hours: Number, minute: Number},
		taux: Number,
		index: Number,
	},
	data () {
		return {
			titleIsUpdated: false,
			titleCopy: this.title
		}
	},
	watch: {
    	titleCopy (title) {
      		this.$emit('update', title)
    	},
  	},
	template:`
		<tr>
			<td>
				<h2 class="title-modal float-left" v-if="!titleIsUpdated" @click.prevent="updateTitle">{{ title }}</h2>
				<textarea ref="textarea" class="float-left"v-if="titleIsUpdated" @keyup.enter.esc="updateTitle" v-model="titleCopy" @input="$emit('update:title', titleCopy)" autofocus>{{ title }}</textarea>
				<button class="suppression" v-on:click="deletePresta">Supprimer</button>
			</td>
			<td>{{ timework.hours }}
				<button @click="upgrade('hours')"><img src="images/plus.png"></button>
				<button @click="downgrade('hours')"><img src="images/minus.png"></button> :
				{{ timework.minutes }}
				<button @click="upgrade('minutes')"><img src="images/plus.png"></button>
				<button @click="downgrade('minutes')"><img src="images/minus.png"></button>
			</td>
			<td><select name="truc" v-on:change="updatePrestationTaux">
					<option v-for="(taux, name) in this.$parent.tauxDispos" v-bind:value="taux">{{ name }} : {{ taux }}€/h</option>
				</select>	
			</td>
			<td>
				<span>{{ total }}</span>
			</td>
		</tr>`,
	computed:{
		total () {
			return (this.timework.hours + this.timework.minutes*0.5/30)*this.taux;
		},
	},
	methods: {
		updateTitle () {
			this.titleIsUpdated = !this.titleIsUpdated
		},
		
		updatePrestationTaux() {
			taux = event.target.value
			this.$emit('tauxupdated', parseInt(taux))
		},

		upgrade(scale){
			if(scale === "hours") {
				this.timework.hours++
			} else {
				calcul = (this.timework.minutes + 15)
				this.timework.minutes = calcul%60
				if(calcul >= 60)
					this.timework.hours++
			}
		},
		downgrade(scale){
			if (this.timework.hours >0 && scale === "hours") {
				this.timework.hours--;
			} else {
				if (this.timework.hours >= 0 && scale === "minutes") {
					this.timework.minutes -=15;
				}
				if (this.timework.minutes ===-15) {
					this.timework.minutes = 45;
	 				this.timework.hours--;
	 			}
	 			if (this.timework.hours === -1) {
	 				this.timework.minutes = 0;
	 				this.timework.hours = 0;
				}
			}
		},

		deletePresta() {
		this.$delete(this.$parent.prestations,this.index);
		},
	},
})

var vm = new Vue({
	el:"#app-1",
	data: {
		prestations: [],
		tauxDispos: {
					'HTML/CSS':30, 
					'Javascript':40,
					'Vue Js':50,
					},
	},
	computed:{
		finalPrice(){
			let sum = 0;
			this.prestations.forEach(function (valeur) {
				sum+= (valeur.timework.hours + valeur.timework.minutes*0.5/30)*valeur.taux		
			});
			return sum
		},
	},
	methods:{
		add: function(){
			this.prestations.push({title:"Prestation "+this.prestations.length, timework:{hours:1, minutes:0}, taux:30 })	
		},
		updateTaux(taux, prestationId){
			alert(taux);
			this.prestation[prestationId].taux = taux;
		}
	}
})






