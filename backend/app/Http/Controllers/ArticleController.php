<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\ArticleResource;

class ArticleController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|unique:articles|max:255',
        'body' => 'required',
        'category_id' => 'required|exists:categories,id',
        'image' => 'required|image|dimensions:min_width=200,min_height=200',
    ]);
    
    $article = new Article($request->all());
    $path = $request->image->store('articles');
    $article->image = $path;
    $article->save();
    return response()->json(new ArticleResource($article), 201);
}
}
