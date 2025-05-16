

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const LogoutButton = ({ logoutHandler }: { logoutHandler: () => void }) => {
  return (
    
<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button color="red">Logout</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content maxWidth="450px">
		<AlertDialog.Title>Logout?</AlertDialog.Title>
		<AlertDialog.Description size="2">
			Are you sure you want to logout? You will be redirected to the login page.
		</AlertDialog.Description>

		<Flex gap="3" mt="4" justify="end">
			<AlertDialog.Cancel>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</AlertDialog.Cancel>
			<AlertDialog.Action>
				<Button variant="solid" color="red" onClick={logoutHandler}>
					Logout
				</Button>
			</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
</AlertDialog.Root>



  )
}

//  <IoLogOut className='text-red-400 text-2xl' />

export default LogoutButton;