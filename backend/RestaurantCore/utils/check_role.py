from restaurant.models import Role 

class UserRole:
    def __init__(self, user) -> None:
        self.user = user
    def is_owner(self):
        return Role.objects.filter(user = self.user, is_owner=True).exists()
    def is_customer(self):
        return Role.objects.filter(user = self.user, is_customer=True).exists()
    def is_employee(self):
        return Role.objects.filter(user = self.user, is_employee=True).exists()
