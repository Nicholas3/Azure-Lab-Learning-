resource "azurerm_resource_group" "sesi6-rg" {
  name     = "sesi6-rg"
  location = "Southeast Asia"
}

resource "azurerm_kubernetes_cluster" "sesi6aks" {
  name                = "sesi6aks"
  location            = azurerm_resource_group.sesi6-rg.location
  resource_group_name = azurerm_resource_group.sesi6-rg.name
  dns_prefix          = "exampleaks1"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_A2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Production"
  }
}

output "client_certificate" {
  value     = azurerm_kubernetes_cluster.sesi6aks.kube_config[0].client_certificate
  sensitive = true
}

output "kube_config" {
  value = azurerm_kubernetes_cluster.sesi6aks.kube_config_raw

  sensitive = true
}

# after init, "terraform apply"