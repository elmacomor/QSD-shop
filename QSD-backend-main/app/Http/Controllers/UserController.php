<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    //Helpers function
    private function infoResponse($status, $message, $record = null): JsonResponse {
        if($record == null){
            return response()->json(['message' => $message,],$status);
        }
        if($message == ''){
            return response()->json(['users' => $record],$status);
        }
        return response()->json(['message' => $message, 'product' => $record],$status);
    }

    private function usersResponse(int $numberOfAdmins, $users): JsonResponse {
        return response()->json([
            'num_of_admins' => $numberOfAdmins,
            'users' => $users
        ]);
    }

    private function adminCounter($users): int {
        $adminCounter = 0;
        foreach ($users as $u){
            if($u->role == 2){
                ++$adminCounter;
            }
        }
        return $adminCounter;
    }

    private function superAdminCounter(): int {
        $users = User::all();
        $super_admin_counter = 0;

        foreach ($users as $u){
            if($u->role == 3){
                ++$super_admin_counter;
            }
        }
        return $super_admin_counter;
    }

    private function banUnbanUser($user, bool $ban_status): void {
        $user->update([
            'status' => $ban_status
        ]);
    }


    //User endpoint methods
    public function getUsers(): JsonResponse {
        $users = User::all();
        return $this->usersResponse($this->adminCounter($users), $users);
    }

    public function getUserById($id): JsonResponse {
        $user = User::find($id);

        if($user){
            return $this->infoResponse(200, '', $user);
        }else{
            return $this->infoResponse(404, 'No user was found with the given id...');
        }
    }

    public function updateUser(Request $request): JsonResponse {
        $validator = Validator::make($request->all(),[
            'id' =>'numeric|required|exists:users,id',
            'first_name' => 'string|required',
            'last_name' => 'string|required',
            'email' => ['required',Rule::unique('users')->ignore($request->id),'string'],
            'phone' => 'string',
            'city' => 'string',
            'address' => 'string',
            'zip_code' => 'string',
        ]);

        if($validator->fails()){
            return $this->infoResponse(422, $validator->messages());
        }

        $user = User::find($request->id);

        if(!$user){
            return $this->infoResponse(404, 'No user was found with the given id...');
        }

        $user -> update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'city' => $request->city,
            'address' => $request->address,
            'zip_code' => $request->zip_code,
        ]);

        return $this->infoResponse(200,'User updated successfully!', $user);
    }

    public function banUser($id): JsonResponse {
        $user = User::find($id);

        if(!$user){
            return $this->infoResponse(404,'No user was found with the given id...');
        }

        if($user->role == 3){
            return $this->infoResponse(403, "Super admin cannot be banned");
        }

        if($user->status == 0){
            $this->banUnbanUser($user, 1);
            return $this->infoResponse(200, 'The user was successfully unbanned!');
        }

        $this->banUnbanUser($user,0);
        return $this->infoResponse(200, 'The user was successfully banned!');
    }

    public function updateRole(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'user_id' => 'integer|required|exists:users,id',
            'role_id' => 'integer|required|in:1,2,3'
        ]);

        if($validator->fails()){
            return $this->infoResponse(422, $validator->messages());
        }

        $user = User::find($request->user_id);

        if(!$user){
            return $this->infoResponse(404, 'No user was found with the given id...');
        }

        if($user->role == 3) {
            if ($this->superAdminCounter() == 1) {
                return $this->infoResponse(403, "The last super admin cannot be changed!");
            }
        }

        $user->update([
            'role' => $request->role_id
        ]);

        return $this->infoResponse(200, 'Role was successfully updated');
    }

    public function deleteUser($id): JsonResponse {
        $user = User::find($id);

        if($user){
            $user->delete();
            return $this->infoResponse(200, 'The user has been successfully deleted!');
        }else{
            return $this->infoResponse(404, 'No user was found with the given id...');
        }
    }
}
