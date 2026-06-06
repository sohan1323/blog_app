from rest_framework import views, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.posts.models import Post
from .models import PostLike

class ToggleLikeView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, slug):
        post = get_object_or_404(Post, slug=slug)
        like_obj, created = PostLike.objects.get_or_create(user=request.user, post=post, defaults={'is_like': True})
        
        if not created:
            if like_obj.is_like:
                like_obj.delete()
                return Response({'status': 'Like removed', 'likes_count': post.likes_count, 'dislikes_count': post.dislikes_count})
            else:
                like_obj.is_like = True
                like_obj.save()
                return Response({'status': 'Changed dislike to like', 'likes_count': post.likes_count, 'dislikes_count': post.dislikes_count})
        
        return Response({'status': 'Liked', 'likes_count': post.likes_count, 'dislikes_count': post.dislikes_count})

class ToggleDislikeView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, slug):
        post = get_object_or_404(Post, slug=slug)
        like_obj, created = PostLike.objects.get_or_create(user=request.user, post=post, defaults={'is_like': False})
        
        if not created:
            if not like_obj.is_like:
                like_obj.delete()
                return Response({'status': 'Dislike removed', 'likes_count': post.likes_count, 'dislikes_count': post.dislikes_count})
            else:
                like_obj.is_like = False
                like_obj.save()
                return Response({'status': 'Changed like to dislike', 'likes_count': post.likes_count, 'dislikes_count': post.dislikes_count})
        
        return Response({'status': 'Disliked', 'likes_count': post.likes_count, 'dislikes_count': post.dislikes_count})