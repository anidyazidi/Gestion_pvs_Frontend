<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    md="4"
                    sm="8"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>المعطيات الشخصية</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <p><strong>الاسم الكامل:</strong> <!-- {{userDetails.name}} --></p>
                        <p><strong>البريدالالكتروني:</strong> <!-- {{userDetails.email}} --></p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    md="4"
                    sm="8"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>تغيير الإسم</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <!-- <v-form ref="changeDetailsForm"> -->
                            <v-form>
                            <v-text-field
                                    
                                    label="الاسم الكامل"
                                    name="name"
                                    type="text"
                            />
                            <!-- :rules="requiredRules" -->
                             <!-- v-model="userDetails.name" -->
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn  color="primary"><!-- @click="changeDetails" -->حفظ</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    md="4"
                    sm="8"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>تغيير كلمة السر</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <!-- <v-form ref="changePasswordForm"> -->
                            <v-form>
                            <v-text-field
                                    
                                    label="كلمة السر القديمة"
                                    name="oldPassword"
                                    type="password"
                                    
                            />
                            <!-- :rules="[...requiredRules, ...passwordRules]" -->
                            <!-- v-model="user.oldPassword" -->
                            <v-text-field
                                    
                                    label="كلمة السر الحديثة"
                                    name="newPassword"
                                    ref="newPasswordInput"
                                    type="password"
                            />
                            <!-- :rules="[...requiredRules, ...passwordRules, newPasswordValidator]" -->
                                    <!-- v-model="user.newPassword" -->
                            <v-text-field
                                    
                                    label="تأكيد كلمة السر الحديثة"
                                    name="newPasswordConfirmation"
                                    type="password"
                            />
                            <!-- :rules="[...requiredRules, ...passwordRules, newPasswordValidator]" -->
                                    <!-- ref="newPasswordConfirmationInput" -->
                                    <!-- v-model="user.newPasswordConfirmation" -->

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary"><!-- @click="changePassword" -->تغيير كلمة السر</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    /* import {mapActions, mapGetters} from "vuex"; */
    /* import PasswordValidationMixin from '../../mixins/passwordValidationMixin'; */

    export default {
       /*  mixins: [PasswordValidationMixin], */
        data() {
            return {
               /*  user: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                } */
            }
        },
       /*  computed: {
            ...mapGetters({
                userDetails: "user/userDetails"
            })
        },
        methods: {
            ...mapActions({
                updateDetails: "user/updateDetails",
                changeUserPassword: "user/changePassword",
                addNotification: "application/addNotification"
            }),
            changeDetails() {
                if (!this.$refs.changeDetailsForm.validate()) {
                    return false;
                }

                this.updateDetails(this.userDetails)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Details changed'
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            show: true,
                            text: 'Failed to change details!!!'
                        })
                    })
            },
            changePassword() {
                if (!this.$refs.changePasswordForm.validate()) {
                    return false;
                }

                this.changeUserPassword(Object.assign({}, this.user, {
                    newPassword_confirmation: this.user.newPasswordConfirmation
                }))
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Password changed'
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            show: true,
                            text: 'Failed to change password!!!'
                        })
                    })
            },
            newPasswordValidator() {
                return (this.user.newPasswordConfirmation === this.user.newPassword) || 'New password is not confirmed';
            } */
        
    }
</script>
