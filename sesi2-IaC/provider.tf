terraform {
   required_providers {
      azurerm = {
         source = "hashicorp/azurerm"
         version = "4.45.1"
      }
   }
}

provider "azurerm" {
   # Configuration options
   features {
      
   }
   subscription_id = "09819424-ab40-4091-9e17-016e123b4196"
}