from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post, PostImage, PostFile
from .serializers import PostSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)
        
        # Handle images
        images = self.request.FILES.getlist('images')
        if images:
            from .models import PostImage
            for img in images:
                PostImage.objects.create(post=post, image=img)
                
        # Handle files
        files = self.request.FILES.getlist('files')
        if files:
            from .models import PostFile
            for f in files:
                PostFile.objects.create(post=post, file=f, file_name=f.name, file_size=f.size)

    def perform_update(self, serializer):
        post = serializer.save()
        
        # Handle appending images
        images = self.request.FILES.getlist('images')
        if images:
            from .models import PostImage
            for img in images:
                PostImage.objects.create(post=post, image=img)
                
        # Handle appending files
        files = self.request.FILES.getlist('files')
        if files:
            for f in files:
                PostFile.objects.create(post=post, file=f, file_name=f.name, file_size=f.size)

    @action(detail=True, methods=['delete'], url_path='remove-image/(?P<image_id>[^/.]+)')
    def remove_image(self, request, slug=None, image_id=None):
        post = self.get_object()
        try:
            image = PostImage.objects.get(id=image_id, post=post)
            image.delete()  # django-cleanup will delete the physical file
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PostImage.DoesNotExist:
            return Response({'detail': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['delete'], url_path='remove-file/(?P<file_id>[^/.]+)')
    def remove_file(self, request, slug=None, file_id=None):
        post = self.get_object()
        try:
            file_obj = PostFile.objects.get(id=file_id, post=post)
            file_obj.delete()  # django-cleanup will delete the physical file
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PostFile.DoesNotExist:
            return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
