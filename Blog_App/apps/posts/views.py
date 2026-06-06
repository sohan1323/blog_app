from rest_framework import viewsets, permissions
from .models import Post
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
            from .models import PostFile
            for f in files:
                PostFile.objects.create(post=post, file=f, file_name=f.name, file_size=f.size)
