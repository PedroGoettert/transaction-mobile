import { colors } from "@/style/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";

export default function SignIn() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInSchema = z.object({
		name: z.string(),
		email: z.string().email().nonempty().toLowerCase(),
		password: z.string().nonempty().min(5),
	});

	type SignInSchema = z.infer<typeof signInSchema>;

	const router = useRouter();

	async function handleSubmitSignIn(dataForm: SignInSchema) {
		setIsLoading(true);
		try {
			const response = await fetch("http://192.168.0.124:3333/user", {
				method: "POST",
				body: JSON.stringify(dataForm),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorMessage = await response.json();
				alert(errorMessage.message);
				return;
			}

			const data = await response.json();

			alert(data.message);
			router.replace("/(tabs)/home");
		} catch (err) {
			throw new Error("Falha na conecção");
		} finally {
			setIsLoading(false);
		}
	}

	const { control, handleSubmit } = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
		},
	});

	return (
		<View style={styles.containerScreen}>
			<View style={styles.containerTitle}>
				<Text style={styles.title}>
					Transaction <Text style={styles.spanTitle}>App</Text>{" "}
				</Text>
				<Text style={styles.subTitle}>Crie sua conta</Text>
			</View>

			<View style={styles.form}>
				{/* Campo name */}
				<View style={styles.containerInput}>
					<Text style={styles.textInput}>Nome</Text>

					<Controller
						name="name"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholderTextColor={colors.black}
								style={styles.input}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="Nome completo"
							/>
						)}
					/>
				</View>

				{/* campo email */}
				<View style={styles.containerInput}>
					<Text style={styles.textInput}>Email</Text>

					<Controller
						name="email"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="email"
								placeholderTextColor={colors.black}
								style={styles.input}
							/>
						)}
					/>
				</View>

				{/* Campo password */}
				<View style={styles.containerInput}>
					<Text style={styles.textInput}>Senha</Text>

					<Controller
						name="password"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="password"
								placeholderTextColor={colors.black}
								secureTextEntry
								style={styles.input}
							/>
						)}
					/>
				</View>

				{/* Botão de Login */}
				{isLoading ? (
					<TouchableOpacity style={styles.button} disabled>
						<ActivityIndicator color={colors.black} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit(handleSubmitSignIn)}
					>
						<Text style={styles.buttonText}>Cadastrar </Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	containerScreen: {
		flex: 1,
		backgroundColor: colors.purple[200],
	},
	containerTitle: {
		justifyContent: "center",
		width: "95%",
		paddingLeft: 20,
		marginTop: 50,
		paddingVertical: 50,
	},
	title: {
		fontSize: 28,
		marginTop: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	spanTitle: {
		color: colors.purple[600],
	},
	subTitle: {
		fontSize: 34,
		fontWeight: "500",
		marginBottom: 16,
	},

	form: {
		flex: 1,
		paddingTop: 12,
		backgroundColor: colors.white,
		borderRadius: 30,
		paddingHorizontal: 16,
	},
	containerInput: {
		paddingVertical: 8,
		gap: 8,
	},
	textInput: {
		fontSize: 16,
		marginLeft: 4,
	},
	input: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.black,
		paddingVertical: 14,
		paddingLeft: 8,
		borderRadius: 10,
	},
	button: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.black,
		paddingVertical: 12,
		marginTop: 18,
		alignItems: "center",
		backgroundColor: colors.purple[100],
		borderRadius: 10,
	},
	buttonText: {
		fontWeight: "bold",
	},
});
