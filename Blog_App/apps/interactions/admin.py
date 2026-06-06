from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import PostLike

@admin.register(PostLike)
class PostLikeAdmin(ModelAdmin):
    list_display = ['user', 'post', 'is_like', 'created_at']
    list_filter = ['is_like', 'created_at']
