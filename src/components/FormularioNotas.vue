<template lang="html">

  <div class="jumbotron">
    <h2>Formulario Notas</h2>
    <hr>

    <vue-form :state="formState" @submit.prevent="enviar()">
      <validate tag="div">
        <label for="nombre">Nombre</label>
        <input class="form-control" type="text" id="nombre" name="nombre" v-model.trim="formData.nombre"
               autocomplete="off" :minlength="minLengthNombre" :maxlength="maxLengthNombre" no-espacios required>
        <field-messages name="nombre" show="$dirty">
          <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          <div slot="no-espacios" class="alert alert-danger mt-1">No se permiten espacios</div>
          <div slot="minlength" class="alert alert-danger mt-1">
            Este campo requiere {{ minLengthNombre }} caracteres como mínimo
          </div>
          <div v-if="formData.nombre.length === maxLengthNombre" class="alert alert-warning mt-1">
            Máximo {{ maxLengthNombre }} caracteres
          </div>
        </field-messages>
      </validate>
      <validate tag="div">
        <label for="apellido">Apellido</label>
        <input class="form-control" type="text" id="apellido" name="apellido" v-model.trim="formData.apellido"
               autocomplete="off" :minlength="minLengthApellido" :maxlength="maxLengthApellido" no-espacios required>
        <field-messages name="apellido" show="$dirty">
          <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          <div slot="no-espacios" class="alert alert-danger mt-1">No se permiten espacios</div>
          <div slot="minlength" class="alert alert-danger mt-1">
            Este campo requiere {{ minLengthApellido }} caracteres como mínimo
          </div>
          <div v-if="formData.apellido.length === maxLengthApellido" class="alert alert-warning mt-1">
            Máximo {{ maxLengthApellido }} caracteres
          </div>
        </field-messages>
      </validate>
      <validate tag="div">
        <label for="nota">Nota</label>
        <input class="form-control" type="number" id="nota" name="nota"
               v-model.number="formData.nota"
               autocomplete="off" :min="minNota" :max="maxNota" required>
        <field-messages name="nota" show="$dirty">
          <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          <div slot="min" class="alert alert-danger mt-1">Por favor ingrese una nota mayor a {{ minNota }}</div>
          <div slot="max" class="alert alert-danger mt-1">Por favor ingrese una nota menor o igual a {{ maxNota }}</div>
        </field-messages>
      </validate>

      <button class="btn btn-success my-3" :disabled="formState.$invalid" type="submit">Enviar</button>

    </vue-form>

    <div v-if="notas.length" class="table-responsive">
      <table class="table table-dark table-bordered table-striped">
        <tr>
          <th>Nombre</th>
          <th>Nota</th>
        </tr>
        <tr v-for="(n, i) in notas" :key="i">
          <td>{{ n.nombre }} {{ n.apellido }}</td>
          <td v-if="n.nota >= 0 && n.nota < 4" class="rojo">{{ n.nota }}</td>
          <td v-else-if="n.nota >= 4 && n.nota <= 6" class="amarillo">{{ n.nota }}</td>
          <td v-else class="verde">{{ n.nota }}</td>
        </tr>
        <tfoot class="promedio text-center">
        <tr>
          <td colspan="2" v-if="promedio >= 0 && promedio < 4" class="rojo">PROMEDIO: {{ promedio }}</td>
          <td colspan="2" v-else-if="promedio >= 4 && promedio <= 6" class="amarillo">PROMEDIO: {{ promedio }}</td>
          <td colspan="2" v-else class="verde">PROMEDIO: {{ promedio }}</td>
        </tr>
        </tfoot>
      </table>
    </div>
    <h4 class="alert alert-danger" v-else>No se encontraron notas</h4>
  </div>

</template>

<script lang="js">

export default {
  name: 'src-components-formulario-notas',
  components: {},
  props: [],
  data() {
    return {
      formData: this.getFormInicial(),
      formState: {},
      notas: [],
      minLengthNombre: 3,
      maxLengthNombre: 15,
      minLengthApellido: 3,
      maxLengthApellido: 15,
      minNota: 0,
      maxNota: 10,
      promedio: 0,
      sumaNotas: 0,
      cantidadNotas: 0
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    getFormInicial() {
      return {
        nombre: '',
        apellido: '',
        nota: ''
      }
    },
    enviar() {
      this.notas.push(this.formData)
      this.cantidadNotas++
      this.recalcularPromedio(this.formData);
      this.formData = this.getFormInicial()
      this.formState._reset()
    },
    recalcularPromedio(f) {
      this.sumaNotas += f.nota
      this.promedio = this.sumaNotas / this.cantidadNotas
    }
  }
}


</script>

<style scoped lang="css">
.jumbotron {
  background-color: rgb(96, 114, 37);
  color: white;
}

hr {
  background-color: #eee;
}

input {
  margin-bottom: 1rem;
}

.rojo {
  color: red;
}

.amarillo {
  color: yellow;
}

.verde {
  color: green;
}

.table-dark {
  background-color: #1d1d1d;
}

.promedio {
  background-color: #000000;
}
</style>
