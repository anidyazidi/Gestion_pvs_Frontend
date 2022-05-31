 <template>
 <v-card
    class="mx-auto"
    tile
  >
   
        <v-card-title dark class="act mb-3 font-weight-black text-h7">
                <v-icon large right>mdi-account-details-outline
            </v-icon>المعطيات الشخصية</v-card-title>
        <v-card-title class="font-weight-black text-h7">
            الاسم الكامل : {{ users.nom }}
        </v-card-title>
        <v-card-title class="font-weight-black text-h7">
            البريد الالكتروني :  {{ users.email }}
        </v-card-title>
        <v-card-title class="font-weight-black text-h7">
            الرقم :  {{ users.numUser }}
        </v-card-title>
        <v-card-title class="font-weight-black text-h7">
           الدور :  {{ users.idRole }}
        </v-card-title>
        <v-card-actions>
             <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
       <v-btn
          v-bind="attrs"
          v-on="on"
            large
            class="font-weight-black text-h6 ma-3 act"
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
            users: {
                nom: "admin",
                email: "admin@gmail.com",
                numUser: "0655667788",
                idRole: "admin",
            }
    }),
  }
</script>