import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="(auth)" // Remova as chaves
				options={{ headerShown: false }} // Oculta o header para o grupo (auth)
			/>
			<Stack.Screen
				name="(tabs)" // Remova as chaves
				options={{ headerShown: false }} // Oculta o header para o grupo (auth)
			/>
		</Stack>
	);
}
