<?php

namespace App\Models;
use Jenssegers\Mongodb\Eloquent\Model;

class Server extends Model
{
    protected $guarded = [];
    protected $fillable = ['title', 'body', 'category_id', 'image'];

}
