<template>

  <v-data-table
    :headers="headers"
    :items="user" no-data-text="معلومات غير متاحة"
    sort-by="numUser"
    class="elevation-1 font-weight-black text-h7"
     hide-default-footer
  >
   
    <template v-slot:top>
      <v-toolbar  flat>
        <v-toolbar-title>المستخدمين</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="green accent-3"
              dark
              class="mb-2 font-weight-black text-h6"
              v-bind="attrs"
              v-on="on"
            >
              حساب جديد
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.numUser"
                      label="numUser"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.role"
                      label="role"
                    ></v-text-field>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:[`item.axions`]="{ item }">
      <v-chip
        :color="getColor(item.numUser)"
        dark
      >   
      </v-chip>

      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'إسم المستخدم', align: 'start', sortable: false, value: 'name', },
        { text: 'رقمه', value: 'numUser' },
        { text: 'البريد الالكتروني', value: 'email' },
        { text: 'دوره', value: 'role' },
        { text: 'Actions', value: 'axions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        numUser: 0,
        email: 0,
        role: 0,
        
      },
      defaultItem: {
        name: '',
        numUser: 0,
        email: 0,
        role: 0,
        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
         getColor (numUser) {
        if (numUser > 400){ numUser="dis"; return 'red'}
        else if (numUser > 200) return 'orange'
        else return 'green'
      },
      initialize () {
        this.user = [
          {
            id:1,
            name: 'شخص1',
            numUser: 59,
            email: 'p1@gmail.com',
            role: 'نائب وكيل الملك',
          },
          {
            id:2,
            name: 'شخص2',
            numUser: 437,
            email: 'p2@gmail.com',
            role: 'كاتب الضبط',
          },
         
        ]
      },

      editItem (item) {
        this.editedIndex = this.user.indexOf(item)
        console.log('ddfd : '+item.id);
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.user.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.user[this.editedIndex], this.editedItem)
        } else {
          this.user.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>