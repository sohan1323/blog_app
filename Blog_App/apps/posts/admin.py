from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Post, PostImage, PostFile

class PostImageInline(TabularInline):
    model = PostImage
    extra = 1

class PostFileInline(TabularInline):
    model = PostFile
    extra = 1

@admin.register(Post)
class PostAdmin(ModelAdmin):
    list_display = ['title', 'author', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PostImageInline, PostFileInline]