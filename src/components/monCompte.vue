 <template>
 <v-card
    class="mx-auto"
    tile
  >
      <v-toolbar dark class="nvbar mb-3" flat height="34px" app>
        <v-toolbar-title  class="font-weight-bold darkgrey--text text-h5">
                <v-icon large right>mdi-account-details-outline
            </v-icon>المعطيات الشخصية</v-toolbar-title> </v-toolbar>
          <v-row  dense justify align-content-center>


            <v-col cols="12" sm="5" class="mx-5">
            الاسم الكامل : 
            <v-text-field
            v-model="users.nom"
            dense outlined
           :disabled="ro"
            class="font-weight-black text-h6"
            >
            </v-text-field>
            </v-col>
            
           
          <v-col cols="12" sm="5" class="mx-5">
            البريد الالكتروني :
          <v-text-field
            v-model="users.email"
            dense outlined
           :disabled="ro"
           class="font-weight-black text-h6"
            >
            </v-text-field>
          </v-col>
       
          <v-col cols="12" sm="5" class="mx-5">
            الرقم :  
          <v-text-field
            v-model="users.numUser"
            dense outlined
           :disabled="ro"
           class="font-weight-black text-h6"
            >
            </v-text-field>
            </v-col>
           
        <v-col cols="12" sm="5" class="mx-5">
           الدور : 
           <v-text-field
            v-model="users.idRole"
            dense outlined
           :disabled="ro"
           class="font-weight-black text-h6"
            >
            </v-text-field>
        </v-col>
        
        </v-row>
        <v-card-actions>
             <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    
      <template v-slot:activator="{ on, attrs }">
       <v-btn
       @click="ro = !ro"
            large
            class="font-weight-bold cyan ma-3 "
            >
           تغيير المعلومات
            </v-btn>
            <v-btn
            v-show="!ro"
            large
            class="font-weight-bold purple ma-3 "
            >
            حفظ
            </v-btn>
            <v-btn
          v-bind="attrs"
          v-on="on"
            large
            class="font-weight-bold green ma-3 "
            >
            تغيير كلمة السر
            </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">تغيير كلمة السر</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="كلمة السر القديمة*"
                  type="password"  :rules="rules.name"
                  required class="font-weight-black text-h7"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  label="كلمة السر الجديدة*"
                  type="password"  :rules="rules.name"
                  required class="font-weight-black text-h7"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="أعد كلمة السر الجديدة*"
                  type="password"  :rules="rules.name"
                  required class="font-weight-black text-h7"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text  class="font-weight-black text-h7 ma-3 act"
            @click="dialog = false"
          >
            إلغاء
          </v-btn>
          <v-btn
             class="font-weight-black text-h7 ma-3 act"
            text
            @click="dialog = false"
          >
            حفظ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
        </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
        rules: {
          name: [val => (val || '').length > 0 || 'المرجوا ملأ هذا الحقل'],
        },
          dialog: false,
          ro: true,
            users: {
                nom: "admin",
                email: "admin@gmail.com",
                numUser: "0655667788",
                idRole: "admin",
            }
    }),
  }
</script>