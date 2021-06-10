import Vue from "vue";
import VueForm from "vue-form";

const options = {
    validators: {
        "no-espacios": function (v) {
            return !v.includes(' ')
        }
    }
}

Vue.use(VueForm, options)