<template>
  <div class="p-6">
    <leighton-form ref="form"></leighton-form>
    <hr class="my-6">
    <pre>{{ data | pretty }}</pre>
    <pre>{{ validity | pretty }}</pre>
  </div>
</template>
<script>
import "leighton-form"; // our form component, imported from npm

export default {
  data: function() {
    return {
      cssUrl: "theme.css", // this gives us some basic css to work with
      fields: [ // fields the form is built from, including validation rules
        {
          field: "firstName",
          fieldType: "text",
          label: "First Name",
          placeholder: "e.g. Captain Awesome",
          hint: "This field is required and validation will not pass without it.", 
          css: "px-5",
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
          css: "px-5"
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
              css: "px-5"
            },
            {
              field: "city",
              fieldType: "text",
              label: "City",
              columns: 4,
              css: "px-5"
            },
            {
              field: "postcode",
              fieldType: "text",
              label: "Postcode",
              columns: 4,
              css: "px-5"
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