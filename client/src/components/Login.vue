<template>
	<v-container fluid class="fill-height">
		<v-row>
			<v-col cols="12" xs="12" sm="6" lg="4" class="ma-auto">
				<v-card class="px-8 pt-6 pb-12" outlined>
					<v-card-title class="text-center">Login</v-card-title>
					<!-- <v-card-subtitle class="mb-5">Sign in</v-card-subtitle> -->
					<v-card-text>
						<validation-observer ref="observer" v-slot="{ invalid }">
							<form @submit.prevent="submit">
								<validation-provider
									v-slot="{ errors }"
									name="Username"
									rules="required|max:10"
								>
									<v-text-field
										v-model="username"
										:counter="10"
										:error-messages="errors"
										label="Username"
										required
									></v-text-field>
								</validation-provider>
								<validation-provider
									v-slot="{ errors }"
									name="password"
									rules="required"
								>
									<v-text-field
										v-model="password"
										:error-messages="errors"
										label="Password"
										required
									></v-text-field>
								</validation-provider>
								<validation-provider
									v-slot="{ errors }"
									rules="required"
									name="checkbox"
								>
									<v-checkbox
										v-model="checkbox"
										:error-messages="errors"
										value="1"
										label="Option"
										type="checkbox"
										required
									></v-checkbox>
								</validation-provider>

								<v-btn class="mr-4" type="submit" :disabled="invalid">
									submit
								</v-btn>
								<v-btn @click="clear"> clear </v-btn>
							</form>
						</validation-observer>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { required, max } from 'vee-validate/dist/rules';
import {
	extend,
	ValidationObserver,
	ValidationProvider,
	setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
	...required,
	message: '{_field_} can not be empty',
});

extend('max', {
	...max,
	message: '{_field_} may not be greater than {length} characters',
});

// extend('password', {
// 	...password,
// 	message: 'Password must be valid',
// });

export default {
	name: 'Login',
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data: () => ({
		username: '',
		password: '',
		// select: null,
		items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
		checkbox: null,
	}),

	methods: {
		submit() {
			this.$refs.observer.validate();
		},
		clear() {
			this.username = '';
			this.password = '';
			this.checkbox = null;
			this.$refs.observer.reset();
		},
	},
};
</script>
