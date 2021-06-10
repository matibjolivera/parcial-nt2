<template>
  <div class="jumbotron">
    <h2>Respuestas</h2>
    <hr>
    <div class="responsive">
      <table class="table table-dark">
        <tr>
          <th>Número de pregunta</th>
          <th>Respuestas</th>
        </tr>
        <tr v-for="(r, i) in respuestas" :key="i">
          <td>{{ r.numero }}</td>
          <td>{{ r.respuestas }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      respuestas: [
        {
          numero: 1,
          respuestas: [
            'c'
          ]
        },
        {
          numero: 2,
          respuestas: [
            'a', 'b'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.jumbotron {
  background-color: #AAD016FF;
  color: black;
}

hr {
  background-color: black;
}
</style>