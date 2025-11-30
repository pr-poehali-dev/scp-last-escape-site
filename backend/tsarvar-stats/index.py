'''
Business: Парсинг статистики сервера Garry's Mod с tsarvar.com
Args: event - dict с httpMethod
      context - object с request_id, function_name
Returns: JSON с данными о сервере (название, онлайн, карта, ранг, статистика игроков)
'''

import json
import urllib.request
import urllib.error
from typing import Dict, Any, Optional
import re

def fetch_server_data(ip: str = "194.93.2.148:27015") -> Optional[Dict[str, Any]]:
    url = f"https://tsarvar.com/ru/servers/garrys-mod/{ip}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
        
        data = {
            'online': False,
            'players': 0,
            'max_players': 60,
            'name': 'SCP FOUNDATION: LAST ESCAPE',
            'map': 'gm_site19',
            'rank': 0,
            'total_servers': 0,
            'country_rank': 0,
            'uptime': '',
            'description': '',
            'game': 'Garry\'s Mod'
        }
        
        players_match = re.search(r'(\d+)\s*/\s*(\d+)', html)
        if players_match:
            data['players'] = int(players_match.group(1))
            data['max_players'] = int(players_match.group(2))
            data['online'] = True
        
        name_match = re.search(r'<h1[^>]*>([^<]+)</h1>', html)
        if name_match:
            data['name'] = name_match.group(1).strip()
        
        map_match = re.search(r'gm_\w+', html)
        if map_match:
            data['map'] = map_match.group(0)
        
        rank_match = re.search(r'#(\d+)\s+из\s+(\d+)', html)
        if rank_match:
            data['rank'] = int(rank_match.group(1))
            data['total_servers'] = int(rank_match.group(2))
        
        country_rank_match = re.search(r'Россия[^#]*#(\d+)\s+из\s+(\d+)', html)
        if country_rank_match:
            data['country_rank'] = int(country_rank_match.group(1))
        
        desc_match = re.search(r'SCP[^<]*(?:НОВЫЕ|ПОДДЕРЖКИ|КЛАССЫ)[^<]*', html)
        if desc_match:
            data['description'] = desc_match.group(0).strip()
        
        return data
        
    except Exception as e:
        return {
            'online': False,
            'players': 0,
            'max_players': 60,
            'name': 'SCP FOUNDATION: LAST ESCAPE',
            'map': 'Unknown',
            'rank': 0,
            'total_servers': 0,
            'country_rank': 0,
            'uptime': '',
            'description': '',
            'game': 'Garry\'s Mod',
            'error': str(e)
        }

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    server_data = fetch_server_data()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(server_data, ensure_ascii=False)
    }
