from rest_framework import serializers
from .models import Post, PostImage, PostFile
from apps.accounts.serializers import UserSerializer

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption', 'order', 'uploaded_at']

class PostFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFile
        fields = ['id', 'file', 'file_name', 'file_size', 'uploaded_at']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    files = PostFileSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    dislikes_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'author', 'title', 'content', 'slug', 'status', 
            'created_at', 'updated_at', 'published_at', 
            'images', 'files', 'likes_count', 'dislikes_count'
        ]
        read_only_fields = ['id', 'author', 'slug', 'created_at', 'updated_at', 'likes_count', 'dislikes_count']

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user
        return super().create(validated_data)
