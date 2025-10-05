resource "azurerm_resource_group" "sesi2-pnt" {
   name     = "sesi2-pnt"
   location = "East Asia"
}

resource "azurerm_virtual_network" "sesi2-pnt-vn" {
   name                = "sesi2-pnt-vn"
   address_space       = ["10.0.0.0/16"]
   location            = azurerm_resource_group.sesi2-pnt.location
   resource_group_name = azurerm_resource_group.sesi2-pnt.name
}

resource "azurerm_subnet" "sesi2-pnt-subnet" {
   name                 = "sesi2-pnt-subnet"
   resource_group_name  = azurerm_resource_group.sesi2-pnt.name
   virtual_network_name = azurerm_virtual_network.sesi2-pnt-vn.name
   address_prefixes     = ["10.0.0.0/24"]
}

resource "azurerm_public_ip" "sesi2-pnt-pip" {
   name                = "sesi2-pnt-pip"
   resource_group_name = azurerm_resource_group.sesi2-pnt.name
   location            = azurerm_resource_group.sesi2-pnt.location
   allocation_method   = "Static"
}

resource "azurerm_network_interface" "sesi2-pnt-nic" {
   name                = "sesi2-pnt-nic"
   location            = azurerm_resource_group.sesi2-pnt.location
   resource_group_name = azurerm_resource_group.sesi2-pnt.name

   ip_configuration {
      name                          = "internal"
      subnet_id                     = azurerm_subnet.sesi2-pnt-subnet.id
      private_ip_address_allocation = "Dynamic"
      public_ip_address_id = azurerm_public_ip.sesi2-pnt-pip.id
   }
}

resource "azurerm_network_security_group" "sesi2-pnt-nsg" {
   name                = "sesi2-pnt-nsg"
   location            = azurerm_resource_group.sesi2-pnt.location
   resource_group_name = azurerm_resource_group.sesi2-pnt.name
}

resource "azurerm_network_security_rule" "sesi2-pnt-rule" {
   name                        = "sesi2-pnt-rule"
   priority                    = 100
   direction                   = "Inbound"
   access                      = "Allow"
   protocol                    = "Tcp"
   source_port_range           = "*"
   destination_port_range      = "22"
   source_address_prefix       = "*"
   destination_address_prefix  = "*"
   resource_group_name         = azurerm_resource_group.sesi2-pnt.name
   network_security_group_name = azurerm_network_security_group.sesi2-pnt-nsg.name
}

//apply aturan ke network interface
resource "azurerm_network_interface_security_group_association" "sesi2-pnt-association" {
   network_interface_id      = azurerm_network_interface.sesi2-pnt-nic.id
   network_security_group_id = azurerm_network_security_group.sesi2-pnt-nsg.id
}

resource "azurerm_linux_virtual_machine" "sesi2-pnt-vm" {
   name                = "sesi2-pnt-vm"
   resource_group_name = azurerm_resource_group.sesi2-pnt.name
   location            = azurerm_resource_group.sesi2-pnt.location
   size                = "Standard_F2"
   admin_username      = "adminuser"
   admin_password = "Admin1234!"
   disable_password_authentication = false
   network_interface_ids = [
      azurerm_network_interface.sesi2-pnt-nic.id,
   ]

   os_disk {
      caching              = "ReadWrite"
      storage_account_type = "Standard_LRS"
   }

   source_image_reference {
      publisher = "Canonical"
      offer     = "0001-com-ubuntu-server-jammy"
      sku       = "22_04-lts"
      version   = "latest"
   }
}