import Vue from 'vue/dist/vue.esm'
import VueResource from 'vue-resource'

Vue.use(VueResource)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("work-form")

  if (element != null) {

    var id = element.dataset.id
    var work = JSON.parse(element.dataset.work)
    var exercises_attributes = JSON.parse(element.dataset.exercisesAttributes)
    exercises_attributes.forEach(function(exercise) { exercise._destroy = null })
    work.exercises_attributes = exercises_attributes

    var app = new Vue({
      el: element,
      data: function() {
        return { id: id, work: work }
      },
      methods: {
        addExercise: function() {
          this.work.exercises_attributes.push({
            id: null,
            name: "",
            sets: "",
            weight: "",
            _destroy: null
          })
        },

        removeExercise: function(index) {
          var exercise = this.work.exercises_attributes[index]

          if (exercise.id == null) {
            this.work.exercises_attributes.splice(index, 1)
          } else {
            this.work.exercises_attributes[index]._destroy = "1"
          }
        },

        undoRemove: function(index) {
          this.work.exercises_attributes[index]._destroy = null
        },

        saveWork: function() {
          // Create a new work
          if (this.id == null) {
            this.$http.post('/works', { work: this.work }).then(response => {
              Turbolinks.visit(`/works/${response.body.id}`)
            }, response => {
              console.log(response)
            })

          // Edit an existing work
          } else {
            this.$http.put(`/works/${this.id}`, { work: this.work }).then(response => {
              Turbolinks.visit(`/works/${response.body.id}`)
            }, response => {
              console.log(response)
            })
          }
        },

        existingWork: function() {
          return this.work.id != null
        }
      }
    })
  }
})
