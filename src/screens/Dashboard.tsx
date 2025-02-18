import { VStack } from "@/components/ui";
import { Welcome } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

export function Dashboard() {
  return (
    <VStack className="flex-1 bg-custom-my-light-green px-6">
      <SafeAreaView>
        <Welcome />
      </SafeAreaView>
    </VStack>
  )
}
