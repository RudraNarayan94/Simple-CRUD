from django.urls import path
from .views import RegisterView, UserDetailView, FirmListCreateView, FirmDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/me/', UserDetailView.as_view(), name='user-detail'),
    path('firms/', FirmListCreateView.as_view(), name='firm-list-create'),
    path('firms/<int:pk>/', FirmDetailView.as_view(), name='firm-detail'),
]
