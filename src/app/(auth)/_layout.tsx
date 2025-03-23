import { colors } from "@/style/colors";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="login" // Nome da rota (deve corresponder ao nome do arquivo)
				options={{ headerShown: false }} // Oculta o header para a tela de login
			/>
			<Stack.Screen
				name="signin" // Nome da rota (deve corresponder ao nome do arquivo)
				options={{ headerShown: false }} // Oculta o header para a tela de login
			/>
		</Stack>
	);
}
