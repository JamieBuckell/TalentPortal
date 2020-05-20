<template>
  <div>
    <section class="relative block ">

      <div
        class="relative pt-16 pb-32 flex content-center items-center justify-center"
        style="min-height: 25vh;"
      >
        <div
          class="absolute top-0 w-full h-full bg-purple-900"
          style="background-image: linear-gradient(90deg, rgba(81,60,127,1) 0%, rgba(201,67,126,1) 100%);"
        ></div>
        <div
          class="absolute top-0 w-full h-full"
          style="background-size: 100%; background-repeat: no-repeat;"
          :style="{'background-image': 'url(' + require('~/assets/img/register_bg_2.png') + ')'}"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-25 bg-black"
          ></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px; transform: translateZ(0px);"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
    </section>

    <section class="p-6 relative py-16 bg-gray-300">
      <leighton-form ref="form"></leighton-form>
      <hr class="my-6">
      <pre>{{ data | pretty }}</pre>
      <pre>{{ validity | pretty }}</pre>
    </section>
  </div>
</template>
<script>
import "leighton-form"; // our form component, imported from npm

export default {
  data: function() {
    return {
      cssUrl: require('~/assets/css/formbuilder.css'), // this gives us some basic css to work with
      fields: [ // fields the form is built from, including validation rules
        {
          field: "firstName",
          fieldType: "text",
          label: "First Name",
          placeholder: "e.g. Captain Awesome",
          hint: "This field is required and validation will not pass without it.", 
          css: "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center",
          validation: {
            // simple internal validation
            presence: { allowEmpty: false, message: "First Name is required" }
          },
          required: true        
        },
        {
          field: "surname",
          fieldType: "text",
          label: "Surname",
          css: "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center"
        },
        {
          field: "address",
          fieldType: "form",
          fields: [
            {
              field: "line1",
              fieldType: "text",
              label: "Street",
              columns: 4,
              css: "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center"
            },
            {
              field: "city",
              fieldType: "text",
              label: "City",
              columns: 4,
              css: "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center"
            },
            {
              field: "postcode",
              fieldType: "text",
              label: "Postcode",
              columns: 4,
              css: "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center"
            }
          ]
        }
      ],
      data: { // some data to pre-fill the form
        firstName: "Lee",
        surname: "Nattress",
        address: {
          line1: "Kwale Golden Guest House",
          city: "Kwale",
          postcode: "Q5X2 WJ"
        }
      },
      validity: {}
    };
  },
  mounted: function() {
    // this kicks off the form and shows fields
    this.refreshForm("form");

    // event happens when the value cahnges
    // (note that we have binding to our object
    // too, seperate to this)
    this.$refs["form"].$on("valueChanged", event =>
      console.log("☎️ Value", event.detail)
    );

    // this event gives us the forms validity
    this.$refs["form"].$on("validityChanged", event => {
      console.log("☎️ Validity", event.detail );
      this.validity = event.detail; //set the validity variable for vue to use
    });
  },
  methods: {
    refreshForm: function(formId) {
      this.$refs[formId].cssUrl = this.cssUrl;
      this.$refs[formId].fields = this.fields;
      this.$refs[formId].data = this.data;
    }
  },
  filters: {
    // a filter to show json in a useful way inside the component
    pretty: function(value) {
      return JSON.stringify(value, null, 2);
    }
  }
};
</script>