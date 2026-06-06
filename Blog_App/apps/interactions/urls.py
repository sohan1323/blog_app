from django.urls import path
from . import views

app_name = 'interactions'

urlpatterns = [
    path('post/<slug:slug>/like/', views.ToggleLikeView.as_view(), name='toggle-like'),
    path('post/<slug:slug>/dislike/', views.ToggleDislikeView.as_view(), name='toggle-dislike'),
]
